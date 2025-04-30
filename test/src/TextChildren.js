import React from "react";

const Text = ({
  text,
  fontSize = "30px",
  fontFamily = "inherit",
  fontWeight = "inherit",
  textWrap = "inherit",
  textOverflow = "inherit",
  color = "inherit",
  style,
  children,
  ...content
}) => {
  return (
    <div
      className="text"
      style={{
        margin: 0,
        ...style,
        color,
        fontSize,
        fontFamily,
        fontWeight,
        textWrap,
        textOverflow,
      }}
      {...content}
    >
      {text !== undefined ? text : children || <p>default</p>}
    </div>
  );
};

export default Text;
