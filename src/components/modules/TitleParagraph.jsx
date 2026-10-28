export default function TitleParagraph({ label, title, paragraph }) {
  const titleMarginTop = label ? "mt-0" : "3";

  return (
    <div className="flex flex-col gap-1 text-left mt-4">
      {label && (
        <h2
          className="text-sm bg-(--marine-clair) px-1 w-fit mb-1 mt-12"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      )}
      {title && (
        <h3
          className={`text-lg font-(family-name:--heading) mb-1 ${titleMarginTop}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {paragraph && (
        <p
        className="text-base"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      )}
    </div>
  );
}