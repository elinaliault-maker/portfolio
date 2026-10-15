export default function TitleParagraph({ showSection, label, title, paragraph }) {
  return (
    <div className="flex flex-col gap-1 text-left mt-12">
      {showSection && (
        <h2
          className="text-sm bg-(--mc-50) w-fit mb-1"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      )}
      {title && (
        <h3
          className="text-lg font-(family-name:--heading) mb-1"
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