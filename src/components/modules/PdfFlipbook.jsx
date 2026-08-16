// modules/PdfFlipbookJs.jsx
import { useEffect, useRef, useState } from "react";
import FlipBook from "flipbook-js";
import "flipbook-js/style.css";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfFlipbookJs({ src, width = "800px" }) {
  const [pages, setPages] = useState([]);
  const [internalStatus, setInternalStatus] = useState("loading");
  const [pageAspect, setPageAspect] = useState(null); // page width / page height

  const status = !src ? "error" : internalStatus;

  const containerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const flipbookInstance = useRef(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;

    async function renderPdfToImages() {
      try {
        setInternalStatus("loading");
        const pdf = await pdfjsLib.getDocument({ url: src }).promise;
        const images = [];
        let firstPageAspect = null;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          if (i === 1) {
            firstPageAspect = viewport.width / viewport.height;
          }

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;
          images.push(canvas.toDataURL("image/png"));
          if (cancelled) return;
        }

        if (!cancelled) {
          setPages(images);
          setPageAspect(firstPageAspect);
          setInternalStatus("ready");
        }
      } catch (err) {
        console.error("PDF render failed:", err);
        if (!cancelled) setInternalStatus("error");
      }
    }

    renderPdfToImages();
    return () => {
      cancelled = true;
    };
  }, [src]);

  // book shows two pages side by side, so the whole book's aspect ratio
  // is (2 * pageWidth) / pageHeight — height derived from your fixed width
  const numericWidth = parseInt(width, 10);
  const computedHeight =
    pageAspect && numericWidth ? `${Math.round(numericWidth / (2 * pageAspect))}px` : undefined;

  useEffect(() => {
    if (status !== "ready" || pages.length === 0 || !containerRef.current || !computedHeight) return;

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
    });

    return () => {
      container.innerHTML = "";
    };
  }, [status, pages, width, computedHeight]);

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
          {pages.map((pageSrc, i) => (
            <div className="c-flipbook__page" key={i}>
              <img src={pageSrc} className="w-full h-full object-contain" draggable={false} />
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