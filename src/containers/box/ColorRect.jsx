import React from "react";

const ColorRect = ({
  backgroundColor = "red",
  style,
  children,
  ...content
}) => {
  return (
    <div
      style={{
        ...style,
        backgroundColor,
      }}
      {...content}
    >
      {children}
    </div>
  );
};

export default ColorRect;
