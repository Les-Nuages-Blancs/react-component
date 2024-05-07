import React, { useRef, useEffect } from "react";

const Video = ({
  src,
  width = "100%",
  height = "100%",
  autoPlay = false,
  muted = true,
  playsInline = true,
  controls = false,
  loop = true,
  objectFit = "cover",
  objectPosition = "center center",

  style = {},
  ...content
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (autoPlay) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    }
  }, []);

  return (
    <video
      style={{
        ...style,
        width,
        height,
        objectFit,
        objectPosition,
      }}
      ref={videoRef}
      src={src}
      autoPlay={autoPlay}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      loop={loop}
      {...content}
    />
  );
};

export default Video;
