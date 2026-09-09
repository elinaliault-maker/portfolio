// modules/PdfFlipbookJs.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router";
import FlipBook from "flipbook-js";
import "flipbook-js/style.css";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import PdfPageLoader from "./PdfPageLoader";
import { getUiTranslation } from "../../../utils/getUiTranslation";
import { Button } from "../../Button";
import { SquareArrowOutUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PRELOAD_WINDOW = 2;
const MOBILE_BREAKPOINT = 640; // px — change this to move where it switches to cover+button
const RESIZE_DEBOUNCE = 200; // ms — how long to wait after resize stops before reinit

export default function PdfFlipbookJs({ src }) {
  const { lang } = useParams();
  const t = getUiTranslation(lang);

  const [internalStatus, setInternalStatus] = useState("loading"); // loading | ready | error
  const [pageImages, setPageImages] = useState([]); // sparse array, null until loaded
  const [pageAspect, setPageAspect] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // derive initial value lazily — no setState-in-effect needed for this
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  );

  const status = !src ? "error" : internalStatus;

  const pdfRef = useRef(null);
  const loadedSetRef = useRef(new Set());
  const [wrapperEl, setWrapperEl] = useState(null); // callback ref target — re-fires when the node actually mounts
  const containerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const flipbookInstance = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const loadPage = useCallback(async (index) => {
    if (loadedSetRef.current.has(index)) return;
    loadedSetRef.current.add(index);

    const pdf = pdfRef.current;
    if (!pdf || index < 0 || index >= pdf.numPages) return;

    try {
      const page = await pdf.getPage(index + 1);
      const viewport = page.getViewport({ scale: 2 });

      if (index === 0) setPageAspect(viewport.width / viewport.height);

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport }).promise;
      const dataUrl = canvas.toDataURL("image/png");

      setPageImages((prev) => {
        const next = [...prev];
        next[index] = dataUrl;
        return next;
      });
    } catch (err) {
      console.error(`Failed to render page ${index + 1}:`, err);
      loadedSetRef.current.delete(index);
    }
  }, []);

  // Open the PDF, get page count.
  useEffect(() => {
    if (!src) return;
    let cancelled = false;

    async function init() {
      try {
        setInternalStatus("loading");
        const pdf = await pdfjsLib.getDocument({ url: src }).promise;
        if (cancelled) return;

        pdfRef.current = pdf;
        setPageImages(new Array(pdf.numPages).fill(null));
        setInternalStatus("ready");
      } catch (err) {
        console.error("PDF open failed:", err);
        if (!cancelled) setInternalStatus("error");
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [src]);

  // Cover always loads first.
  useEffect(() => {
    if (status === "ready" && pageImages.length > 0) {
      loadPage(0);
    }
  }, [status, pageImages.length, loadPage]);

  // Preload window around current page — desktop only.
  useEffect(() => {
    if (status !== "ready" || isMobile) return;
    for (let offset = -PRELOAD_WINDOW; offset <= PRELOAD_WINDOW; offset++) {
      loadPage(currentPage + offset);
    }
  }, [currentPage, status, isMobile, loadPage]);

  // Idle background fill — desktop only.
  useEffect(() => {
    if (status !== "ready" || pageImages.length === 0 || isMobile) return;

    const idleId = (window.requestIdleCallback || ((fn) => setTimeout(fn, 200)))(function fillRest() {
      const nextUnloaded = pageImages.findIndex((img, i) => img === null && !loadedSetRef.current.has(i));
      if (nextUnloaded !== -1) loadPage(nextUnloaded);
    });

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
    };
  }, [pageImages, status, isMobile, loadPage]);

  // Subscribe to breakpoint changes (initial value already set lazily above).
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Measure the wrapper's real width. Depends on wrapperEl (state, set via
  // callback ref) instead of a plain ref + [] deps, so it correctly re-runs
  // once the wrapper div actually mounts — even if that happens after the
  // "loading" branch's placeholder JSX (which has no wrapper at all).
  useEffect(() => {
    if (!wrapperEl) return;

    const observer = new ResizeObserver((entries) => {
      const newWidth = Math.round(entries[0].contentRect.width);
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setContainerWidth(newWidth);
      }, RESIZE_DEBOUNCE);
    });

    observer.observe(wrapperEl);
    return () => {
      observer.disconnect();
      clearTimeout(resizeTimeoutRef.current);
    };
  }, [wrapperEl]);

  const computedHeight =
    pageAspect && containerWidth ? Math.round(containerWidth / (2 * pageAspect)) : undefined;

  // Derived key — no separate state/effect needed. Changes whenever the
  // container's real size changes, which is exactly when we want React to
  // fully unmount + remount the .c-flipbook subtree (fresh page divs) before
  // FlipBook re-initializes on it.
  const flipbookKey = `${containerWidth}-${computedHeight}`;

  // Mount / reinit the flipbook whenever the remount key changes.
  useEffect(() => {
    if (
      status !== "ready" ||
      isMobile ||
      pageImages.length === 0 ||
      !containerRef.current ||
      !computedHeight ||
      !containerWidth
    ) {
      return;
    }

    const container = containerRef.current;
    container.id = "flipbook-container";

    flipbookInstance.current = new FlipBook("flipbook-container", {
      nextButton: nextBtnRef.current,
      previousButton: prevBtnRef.current,
      canClose: true,
      initialCall: true,
      arrowKeys: true,
      initialActivePage: currentPage,
      width: `${containerWidth}px`,
      height: `${computedHeight}px`,
      onPageTurn: (e) => {
        const page = typeof e === "number" ? e : e?.page ?? e?.detail?.page;
        if (typeof page === "number") setCurrentPage(page);
      },
    });

    // No manual innerHTML clearing — React owns unmounting the old subtree
    // via the key change on the container div. We just drop our reference.
    return () => {
      flipbookInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isMobile, pageImages.length, flipbookKey]);

  if (status === "loading") {
    return <div className="text-sm text-(--marine) py-12 text-center">{t.projectDetail.pdfFlipbook.loading}</div>;
  }

  if (status === "error") {
    return (
      <div className="text-sm text-(--state-red) py-12 text-center">
        {t.projectDetail.pdfFlipbook.error.didntLoad} {" "}
        <a href={src} className="underline" target="_blank" rel="noreferrer">
          {t.projectDetail.pdfFlipbook.error.openInstead}
        </a>
        .
      </div>
    );
  }

  // MOBILE: cover image + button to open the raw PDF.
  if (isMobile) {
    const coverAspectHeight =
      pageAspect && containerWidth ? Math.round(containerWidth / pageAspect) : undefined;

    return (
      <div ref={setWrapperEl} className="w-full min-w-0 flex flex-col items-center gap-4">
        <div className="w-full" style={{ height: coverAspectHeight }}>
          {pageImages[0] ? (
            <img
              src={pageImages[0]}
              className="w-full h-full object-contain shadow-lg"
              draggable={false}
            />
          ) : (
            <PdfPageLoader pageHeight={coverAspectHeight ? `${coverAspectHeight}px` : "300px"} />
          )}
        </div>
        {/* <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition"
        >
          Open document
        </a> */}
        <Button 
          text={t.projectDetail.pdfFlipbook.ready.openDoc}
          icon={SquareArrowOutUpRight}
          variant="primary"
          textSize="small"
          href={src}
        />
      </div>
    );
  }

  // DESKTOP/TABLET: full flipbook.
  return (
    <div ref={setWrapperEl} className="w-full min-w-0 flex flex-col items-center gap-10 relative">
      <div className="relative w-full" style={{ height: computedHeight }}>
        <div
          key={flipbookKey}
          className="c-flipbook relative"
          ref={containerRef}
          style={{ width: containerWidth, height: computedHeight }}
        >
          {pageImages.map((imgSrc, i) => (
            <div className="c-flipbook__page" key={i}>
              {imgSrc ? (
                <img src={imgSrc} className="w-full h-full object-contain" draggable={false} />
              ) : (
                <PdfPageLoader pageHeight={computedHeight ? `${computedHeight}px` : undefined} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <Button 
          ref={prevBtnRef}
          text={t.projectDetail.pdfFlipbook.ready.previous}
          icon={ArrowLeft}
          variant="secondary"
          textSize="small"
        />
        <Button 
          text={t.projectDetail.pdfFlipbook.ready.openDoc}
          icon={SquareArrowOutUpRight}
          variant="primary"
          textSize="small"
          href={src}
        />
        <Button 
          ref={nextBtnRef}
          text={t.projectDetail.pdfFlipbook.ready.next}
          icon={ArrowRight}
          variant="secondary"
          textSize="small"
        />
      </div>
    </div>
  );
}