import React from "react";
import Video from "../../components/frontComponents/Video";

const VideoRect = ({
  width = "100vw",
  height = "100vh",
  videoPosition = "absolute",

  style = {},
  children,
  ...content
}) => {
  return (
    <div
      style={{
        ...style,
        width,
        height,
        overflow: "hidden",
        transition: "none",
      }}
    >
      <Video
        {...content}
        style={{
          width: "100%",
          height: "100%",
          zIndex: -1,
          position: videoPosition,
        }}
      />
      <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default VideoRect;
