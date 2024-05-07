import React, { useState } from "react";
import Text from "./Text";

const ButtonWithHover = ({
  normalImage = "https://github.com/liro-u/react-component/blob/main/assets/buttonWithHover.png?raw=true",
  hoverImage,
  fontSize = "30px",
  style,
  imgStyle = { width: "100%" },
  text = "",
  ...content
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...content}
      style={{
        ...style,
        display: "inline-block",
        position: "relative",
      }}
    >
      <img
        src={
          isHovered && hoverImage && hoverImage !== ""
            ? hoverImage
            : normalImage
        }
        alt="Button"
        style={imgStyle}
      />
      <Text
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          marginTop: "-4px",
        }}
        text={text}
        fontSize={fontSize}
        fontWeight="bold"
      />
    </div>
  );
};

export default ButtonWithHover;
