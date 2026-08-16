// modules/PdfFlipbookJs.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import FlipBook from "flipbook-js";
import "flipbook-js/style.css";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import PdfPageLoader from "./PdfPageLoader";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PRELOAD_WINDOW = 2; // pages loaded ahead/behind current, beyond the cover

export default function PdfFlipbookJs({ src, width = "800px" }) {
  const [internalStatus, setInternalStatus] = useState("loading"); // loading | ready | error
  const [pageImages, setPageImages] = useState([]); // sparse array, null until loaded
  const [pageAspect, setPageAspect] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const status = !src ? "error" : internalStatus;

  const pdfRef = useRef(null); // the loaded pdf document
  const loadedSetRef = useRef(new Set()); // which indices are loaded or in-flight
  const containerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const flipbookInstance = useRef(null);

  // Renders a single page to an image and stores it at that index.
  const loadPage = useCallback(async (index) => {
    if (loadedSetRef.current.has(index)) return;
    loadedSetRef.current.add(index);

    const pdf = pdfRef.current;
    if (!pdf || index < 0 || index >= pdf.numPages) return;

    try {
      const page = await pdf.getPage(index + 1); // pdf.js pages are 1-indexed
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
      loadedSetRef.current.delete(index); // allow retry later
    }
  }, []);

  // Step 1: open the PDF and get page count fast — no rasterizing yet.
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

  // Step 2: once we know the page count, load the cover first (priority 1).
  useEffect(() => {
    if (status === "ready" && pageImages.length > 0) {
      loadPage(0);
    }
  }, [status, pageImages.length, loadPage]);

  // Step 3: whenever the visible page changes, load a window around it first.
  useEffect(() => {
    if (status !== "ready") return;
    for (let offset = -PRELOAD_WINDOW; offset <= PRELOAD_WINDOW; offset++) {
      loadPage(currentPage + offset);
    }
  }, [currentPage, status, loadPage]);

  // Step 4: low-priority background pass — fill in everything else, in order,
  // once the browser is idle, so the whole book is eventually available.
  useEffect(() => {
    if (status !== "ready" || pageImages.length === 0) return;

    const idleId = (window.requestIdleCallback || ((fn) => setTimeout(fn, 200)))(function fillRest() {
      const nextUnloaded = pageImages.findIndex((img, i) => img === null && !loadedSetRef.current.has(i));
      if (nextUnloaded !== -1) loadPage(nextUnloaded);
    });

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
    };
  }, [pageImages, status, loadPage]);

  const numericWidth = parseInt(width, 10);
  const computedHeight = pageAspect && numericWidth ? `${Math.round(numericWidth / (2 * pageAspect))}px` : undefined;

  // Step 5: init the flipbook once we have the page count + first computed
  // height. The DOM already has the right number of divs (even if some
  // images aren't loaded yet), so this never needs to reinit later.
  useEffect(() => {
    if (status !== "ready" || pageImages.length === 0 || !containerRef.current || !computedHeight) return;
    if (flipbookInstance.current) return; // already initialized, don't redo it

    const container = containerRef.current;
    container.id = "flipbook-container";

    flipbookInstance.current = new FlipBook("flipbook-container", {
      nextButton: nextBtnRef.current,
      previousButton: prevBtnRef.current,
      canClose: true,
      initialCall: true,
      arrowKeys: true,
      initialActivePage: 0,
      width,
      height: computedHeight,
      onPageTurn: (e) => {
        // adjust this depending on what shape flipbook-js actually passes —
        // check the arg in devtools if the page index doesn't line up
        const page = typeof e === "number" ? e : e?.page ?? e?.detail?.page;
        if (typeof page === "number") setCurrentPage(page);
      },
    });

    return () => {
      container.innerHTML = "";
    };
  }, [status, pageImages.length, width, computedHeight]);

  if (status === "loading" || (status === "ready" && !computedHeight)) {
    return <div className="text-sm text-gray-400 py-12 text-center">Loading document…</div>;
  }

  if (status === "error") {
    return (
      <div className="text-sm text-red-500 py-12 text-center">
        Couldn't load the PDF.{" "}
        <a href={src} className="underline" target="_blank" rel="noreferrer">
          Open it directly instead
        </a>
        .
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 relative">
      <div className="relative" style={{ width, height: computedHeight }}>
        <div className="c-flipbook relative" ref={containerRef} style={{ width, height: computedHeight }}>
          {pageImages.map((imgSrc, i) => (
            <div className="c-flipbook__page" key={i}>
              {imgSrc ? (
                <img src={imgSrc} className="w-full h-full object-contain" draggable={false} />
              ) : (
                <PdfPageLoader pageHeight={computedHeight} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button ref={prevBtnRef} className="p-2 px-4 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm">
          ← Previous
        </button>
        <button ref={nextBtnRef} className="p-2 px-4 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm">
          Next →
        </button>
      </div>
    </div>
  );
}