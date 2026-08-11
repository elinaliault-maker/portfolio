// modules/PdfFlipbook.jsx
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfFlipbook({ src, width = 500, height = 700 }) {
  const [pages, setPages] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const flipBookRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function renderPdfToImages() {
      try {
        setStatus("loading");
        const pdf = await pdfjsLib.getDocument({ url: src }).promise;
        const images = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 }); // scale 2 = sharper on retina

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
    <div className="flex flex-col items-center gap-4">
      <HTMLFlipBook
        ref={flipBookRef}
        width={width}
        height={height}
        size="stretch"
        minWidth={300}
        maxWidth={800}
        minHeight={400}
        maxHeight={1000}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-xl"
      >
        {pages.map((src, i) => (
          <div key={i} className="bg-white">
            <img src={src} className="w-full h-full object-contain" draggable={false} />
          </div>
        ))}
      </HTMLFlipBook>

      <div className="flex gap-4 text-sm text-gray-500">
        <button onClick={() => flipBookRef.current.pageFlip().flipPrev()}>← Prev</button>
        <button onClick={() => flipBookRef.current.pageFlip().flipNext()}>Next →</button>
      </div>
    </div>
  );
}