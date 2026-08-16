import { pdfLoaderTheme } from "./pdfFlipbookTheme";

export default function PdfPageLoader({ pageHeight }) {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ backgroundColor: pdfLoaderTheme.backgroundColor, 
        height : pageHeight
      }}
    >
      <div
        className="rounded-full border-4 border-t-transparent animate-spin"
        style={{
          width: pdfLoaderTheme.spinnerSize,
          height: pdfLoaderTheme.spinnerSize,
          borderColor: pdfLoaderTheme.spinnerColor,
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
}