// modules/PdfBookViewer.jsx
import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { ChevronLeft, ChevronRight } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfBookViewer({ src }) {
  const [pages, setPages] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [spreadIndex, setSpreadIndex] = useState(0); // which "spread" (2-page view) we're on

  useEffect(() => {
    let cancelled = false;

    async function renderPdfToImages() {
        if (!src) {
            console.error("PdfBookViewer: no src provided");
            setStatus("error");
            return;
        }

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

  // Build the list of "spreads": [ [cover], [1,2], [3,4], ... ]
  // Cover (page 0) is alone, then every pair after that is grouped together.
  const spreads = [];
  if (pages.length > 0) {
    spreads.push([pages[0]]);
    for (let i = 1; i < pages.length; i += 2) {
      spreads.push([pages[i], pages[i + 1]].filter(Boolean));
    }
  }

  const canGoBack = spreadIndex > 0;
  const canGoForward = spreadIndex < spreads.length - 1;

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

  const currentSpread = spreads[spreadIndex] || [];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSpreadIndex((i) => i - 1)}
          disabled={!canGoBack}
          className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2 shadow-xl">
          {currentSpread.map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-150 w-auto object-contain bg-white"
              draggable={false}
            />
          ))}
        </div>

        <button
          onClick={() => setSpreadIndex((i) => i + 1)}
          disabled={!canGoForward}
          className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <span className="text-xs text-gray-400">
        {spreadIndex + 1} / {spreads.length}
      </span>
    </div>
  );
}