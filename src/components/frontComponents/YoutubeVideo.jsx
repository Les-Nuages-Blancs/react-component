import React from "react";

const YoutubeVideo = ({
  url = "6rNR_xa60J0",
  width = "560",
  height = "315",
  iframeTitle = "YouTube video player",
  autoPlay = false,
  frameBorder = "0",
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  allowFullScreen = true,
  // style
  style,
  // other props
  ...content
}) => {
  const handleIframeError = (event) => {
    event.preventDefault();
  };

  return (
    <iframe
      className="videoComponent"
      src={
        "https://www.youtube.com/embed/" + url + (autoPlay ? "?autoplay=1" : "")
      }
      width={width}
      height={height}
      title={iframeTitle}
      frameBorder={frameBorder}
      allow={allow}
      allowFullScreen={allowFullScreen}
      style={style}
      onError={handleIframeError}
      {...content}
    />
  );
};

export default YoutubeVideo;
