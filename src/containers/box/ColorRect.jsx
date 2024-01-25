import React from "react";

const ColorRect = ({ backgroundColor = "red", style, children }) => {
  return (
    <div
      style={{
        ...style,
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

export default ColorRect;
