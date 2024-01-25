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
          src="https://media.discordapp.net/attachments/1199345400084172800/1199345422158807131/GUI2FExplorer2Ffolder.png?ex=65c23477&is=65afbf77&hm=b1e384ec3c49e56cee0817b87db72705e3cb2a549865971d517c7cbaee87c0d0&=&format=webp&quality=lossless&width=640&height=640"
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
