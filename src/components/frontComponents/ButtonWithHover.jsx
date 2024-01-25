import React, { useState } from "react";
import Text from "./Text";

const ButtonWithHover = ({
  normalImage = "https://media.discordapp.net/attachments/1199345400084172800/1199346104307822735/GUI2Fbutton2Fdownload.png?ex=65c2351a&is=65afc01a&hm=236b8c5353e386ec8fa50bc9bd48ee4661c52fc522b62f2f7e3beebb3d02bb45&=&format=webp&quality=lossless&width=432&height=135",
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
