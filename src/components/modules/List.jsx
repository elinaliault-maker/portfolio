function ListSimple({ text }) {
  return (
    <div className="flex items-baseline gap-1.5 ml-4
    text-left text-sm text-(--marine)">
      <span className="shrink-0" aria-hidden="true">
        ✽
      </span>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

function List({ textArray }) {
  return (
    <div className="group flex flex-col gap-0.5 mt-1">
      {textArray.map((textItem, i) => (
        <ListSimple text={textItem} key={i} />
      ))}
    </div>
  );
}

export default function ListBlock({ title, paragraph, items }) {
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
      {items && items.length > 0 && <List textArray={items} />}
    </div>
  );
}