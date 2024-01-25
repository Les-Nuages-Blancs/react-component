import React from "react";
import VBox from "../../containers/box/VBox";
import Text from "../frontComponents/Text";
import ColorRect from "../../containers/box/ColorRect";
import Image from "../frontComponents/Image";

const DocumentButton = ({ src, title, style, ...content }) => {
  return (
    <ColorRect
      backgroundColor="rgba(0,0,0,0)"
      style={{ cursor: "pointer", ...style }}
    >
      <VBox {...content}>
        <Image src={src} width="100%" height="100%" />
        <Text
          text={title}
          style={{ textAlign: "center", overflowWrap: "anywhere" }}
          fontSize="small"
        />
      </VBox>
    </ColorRect>
  );
};

export default DocumentButton;
