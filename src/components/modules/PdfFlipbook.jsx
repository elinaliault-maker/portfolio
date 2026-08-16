// modules/PdfFlipbookJs.jsx
import { useEffect, useRef, useState } from "react";
import FlipBook from "flipbook-js";
import "flipbook-js/style.css";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfFlipbookJs({ src, width = "800px", height = "600px" }) {
  const [pages, setPages] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const containerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const flipbookInstance = useRef(null);

  // Step 1: rasterize PDF pages to images (same as before)
  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }
    let cancelled = false;

    async function renderPdfToImages() {
      try {
        setStatus("loading");
        const pdf = await pdfjsLib.getDocument({ url: src }).promise;
        const images = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
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
          setStatus("ready");
        }
      } catch (err) {
        console.error("PDF render failed:", err);
        if (!cancelled) setStatus("error");
      }
    }

    renderPdfToImages();
    return () => {
      cancelled = true;
    };
  }, [src]);

  // Step 2: once pages are rasterized AND the DOM skeleton (with that many
  // .c-flipbook__page divs) has actually rendered, mount the plugin.
  useEffect(() => {
    if (status !== "ready" || pages.length === 0 || !containerRef.current) return;

    // flipbook-js needs a real element id to find its container
    containerRef.current.id = "flipbook-container";

    flipbookInstance.current = new FlipBook("flipbook-container", {
      nextButton: nextBtnRef.current,
      previousButton: prevBtnRef.current,
      canClose: true,
      initialCall: true,
      arrowKeys: true,
      initialActivePage: 0,
      width,
      height,
    });

    // no documented destroy() in the README — if pages/src change and remount
    // is needed, clearing the container's innerHTML before re-init avoids
    // stacking duplicate instances on the same id.
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [status, pages, width, height]);

  if (status === "loading") {
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
        <div className="relative"
        style={{ width: `${width}`, height: `${height}`,}}>
            <div className="c-flipbook" ref={containerRef}>
                {pages.map((pageSrc, i) => (
                <div className="c-flipbook__page" key={i}>
                    <img src={pageSrc} className="w-full h-full object-contain" draggable={false} />
                </div>
                ))}
            </div>
        </div>
      

      <div className="flex gap-4">
        <button
          ref={prevBtnRef}
          className="p-2 px-4 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm"
        >
          ← Previous
        </button>
        <button
          ref={nextBtnRef}
          className="p-2 px-4 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}