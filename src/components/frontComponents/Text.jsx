import React from "react";

const Text = ({
  text = "default",
  fontSize = "30px",
  fontFamily = "inherit",
  fontWeight = "inherit",
  textWrap = "inherit",
  textOverflow = "inherit",
  color = "inherit",
  style,
  ...content
}) => {
  return (
    <p
      className="text"
      style={{
        margin: 0,
        ...style,
        color: text ? color : "rgba(0,0,0,0)",
        fontSize,
        fontFamily,
        fontWeight,
        textWrap,
        textOverflow,
      }}
      {...content}
    >
      {text ? text : "."}
    </p>
  );
};

export default Text;
