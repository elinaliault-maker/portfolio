export default function SectionTitle({ title }) {
  // return <h2 className="text-4xl font-bold">{title}</h2>;
  return (
    <h2
      className="text-2xl text-left"
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
}