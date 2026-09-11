export default function VideoBlock({ src, poster, caption, autoplay = false, loop = false }) {
  return (
    <figure className="w-full">
      <video
        src={src}
        poster={poster}
        controls
        autoPlay={autoplay}
        loop={loop}
        muted={autoplay} // browsers block autoplay with sound — muted is required for it to actually work
        className="w-full"
      />
      {caption && (
        <figcaption
          className="text-sm text-(--marine)/64 mt-2"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
}