export default function Overview({ title, paragraph, timeline, team, role, tools, t }) {
  const descriptors = [
    { value: timeline, label: t.projectDetail.overview.timeline },
    { value: team, label: t.projectDetail.overview.team },
    { value: role, label: t.projectDetail.overview.role },
    { value: tools, label: t.projectDetail.overview.tools },
  ].filter((d) => d.value);

  return (
    <div className="flex flex-col gap-1 text-left">
      {title && (
        <h3 className="text-lg font-(family-name:--heading)" dangerouslySetInnerHTML={{ __html: title }} />
      )}
      {paragraph && (
        <p className="text-base" dangerouslySetInnerHTML={{ __html: paragraph }} />
      )}

      {descriptors.length > 0 && (
        <dl className="flex flex-col gap-3 mt-4">
          {descriptors.map((d) => {
          const value = Array.isArray(d.value) ? d.value.join(", ") : d.value;
          return (
            <div key={d.label} className="flex gap-4">
              <dt className="w-24 shrink-0 text-(--marine)/64">{d.label}</dt>
              <dd dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          );
        })}
        </dl>
      )}
    </div>
  );
}