import React, { useState } from "react";
import Icon from "./Icon";

const IconButton = ({
  iconName = "shapes",
  fontHeight = "30px",
  opacityHover = 0.3,
  delay = "1s",
  // style
  style = {},
  // other props
  ...content
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleHover = (hoverBool) => {
    setIsHover(hoverBool);
  };
  return (
    <Icon
      iconName={iconName}
      fontSize={fontHeight}
      style={{
        transition: "background-color " + delay + "",
        backgroundColor: isHover
          ? "rgba(255,255,255," + opacityHover + ")"
          : "rgba(255,255,255,0)",
        borderRadius: "100px",
        aspectRatio: "1 / 1",
        padding: "10px",
        ...style,
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      {...content}
    />
  );
};

export default IconButton;
