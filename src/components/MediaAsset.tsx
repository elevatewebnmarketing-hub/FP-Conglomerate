type MediaAssetProps = {
  src?: string;
  alt: string;
  className?: string;
};

function isVideoSource(src: string) {
  return (
    src.startsWith("data:video/") ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src)
  );
}

export default function MediaAsset({ src, alt, className }: MediaAssetProps) {
  if (!src) {
    return <div className={className} aria-label={alt} />;
  }

  if (isVideoSource(src)) {
    return (
      <video
        src={src}
        className={className}
        controls
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}
