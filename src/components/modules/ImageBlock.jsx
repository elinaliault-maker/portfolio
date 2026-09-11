export default function ImageBlock({ src, caption, size = "full" }) {
  const sizeClass = size === "full" ? "w-full" : "max-w-2xl mx-auto";

  return (
    <figure className={sizeClass}>
      <img src={src} className="w-full" />
      {caption && (
        <figcaption
          className="text-sm text-(--marine)/64 mt-2"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
}