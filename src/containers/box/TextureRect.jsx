import React from "react";

const TextureRect = ({
  texture = "",
  size = "cover",
  width = "unset",
  height = "unset",
  positionX = "center",
  positionY = "center",
  repeatX = "no-repeat",
  repeatY = "no-repeat",
  style,
  children,
  ...content
}) => {
  return (
    <div
      style={{
        width,
        height,
        ...style,
        backgroundImage: "url(" + texture + ")",
        backgroundSize: size,
        backgroundPositionX: positionX,
        backgroundPositionY: positionY,
        backgroundRepeatX: repeatX,
        backgroundRepeatY: repeatY,
      }}
      {...content}
    >
      {children}
    </div>
  );
};

export default TextureRect;
