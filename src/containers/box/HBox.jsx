import React from "react";

const HBox = ({
  gap = "0px",
  justifyContent = "left",
  // children
  children,
  // style
  style,
  // other props
  ...content
}) => {
  return (
    <div
      className="hBox"
      style={{
        display: "flex",
        gap: gap,
        justifyContent,
        ...style,
      }}
      {...content}
    >
      {children}
    </div>
  );
};

export default HBox;
