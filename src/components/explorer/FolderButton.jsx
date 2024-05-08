import React from "react";
import VBox from "../../containers/box/VBox";
import Text from "../frontComponents/Text";
import Image from "../frontComponents/Image";
import ColorRect from "../../containers/box/ColorRect";

const FolderButton = ({ path, title, style, ...content }) => {
  return (
    <ColorRect
      backgroundColor="rgba(0,0,0,0)"
      style={{ cursor: "pointer", ...style }}
    >
      <VBox {...content}>
        <Image
          width="100%"
          height="100%"
          src="https://github.com/liro-u/react-component/blob/main/assets/folder.png?raw=true"
        />
        <Text
          text={title}
          style={{ textAlign: "center", overflowWrap: "anywhere" }}
          fontSize="small"
        />
      </VBox>
    </ColorRect>
  );
};

export default FolderButton;
