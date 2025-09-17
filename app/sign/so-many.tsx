/** biome-ignore-all lint/performance/noImgElement: image tag */
/** biome-ignore-all lint/correctness/useJsxKeyInIterable: image tag */
type Props = { images: { src: string; alt: string }[] };

export default function SoMany({ images }: Props) {
  return (
    <div className="flex">
      <div className="flex flex-1">
        {images.map(({ src: id, src, alt }, idx) => (
          <img
            key={`${id}`}
            src={src}
            alt={alt}
            width={35}
            height={35}
            className={`translate-x-[${-20 * idx}px] rounded-full border border-blue-300`}
          />
        ))}
      </div>
      <div className="flex flex-1 justify-end border-l-1">
        <strong>500K </strong> Books
      </div>
    </div>
  );
}
