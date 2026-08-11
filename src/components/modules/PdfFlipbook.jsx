// modules/PdfFlipbookMotion.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { ChevronLeft, ChevronRight } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfFlipbookMotion({ src }) {
  const [pages, setPages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [spreadIndex, setSpreadIndex] = useState(0);

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
      {/* fixed-width outer wrapper — arrows are anchored to ITS edges, not the image row's */}
      <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[600px]">
        <button
          onClick={() => canGoBack && setSpreadIndex((i) => i - 1)}
          disabled={!canGoBack}
          className="absolute left-0 z-10 p-2 rounded-full border border-gray-200 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={spreadIndex}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex shadow-xl"
          >
            {currentSpread.map((pageSrc, i) => (
              <img
                key={i}
                src={pageSrc}
                className="h-[600px] w-auto object-contain bg-white block"
                draggable={false}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => canGoForward && setSpreadIndex((i) => i + 1)}
          disabled={!canGoForward}
          className="absolute right-0 z-10 p-2 rounded-full border border-gray-200 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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