export default function TitleParagraph({ title, paragraph }) {
  return (
    <div className="flex flex-col gap-1 text-left mt-14">
      {title && (
        <h3
          className="text-lg font-(family-name:--heading)"
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