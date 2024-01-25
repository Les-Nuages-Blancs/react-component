import React from "react";

const Image = ({
  alt = "image",
  src = "placeholder.png",
  width = "500px",
  height = "281px",
  objectFit = "cover",
  objectPosition = "center center",
  // other
  openBig = false,
  // style
  style = {},
  // other props
  ...content
}) => {
  const createImage = (withStyle = true) => {
    return (
      <img
        className="imageComponent"
        src={src}
        alt={alt}
        style={
          withStyle
            ? {
                width,
                height,
                objectFit,
                objectPosition,
                ...style,
              }
            : {
                width,
                height,
                objectFit,
                objectPosition,
              }
        }
        {...content}
      />
    );
  };
  return (
    <>
      {openBig ? (
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          style={{
            width,
            height,
            objectFit,
            objectPosition,
          }}
        >
          {createImage()}
        </a>
      ) : (
        createImage()
      )}
    </>
  );
};

export default Image;
