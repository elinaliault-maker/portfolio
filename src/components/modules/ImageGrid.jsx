export default function ImageGrid({ images, columns = 2 }) {
  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {images.map((img, i) => (
        <figure key={i}>
          <img src={img.src} className="w-full rounded-lg" />
          {img.caption && (
            <figcaption className="text-sm text-gray-500 mt-2">{img.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}