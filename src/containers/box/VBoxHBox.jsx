import React from "react";
import VBox from "./VBox";
import HBox from "./HBox";

const VBoxHBox = ({ vbox = true, children, ...content }) => {
  return (
    <>
      {vbox ? (
        <VBox {...content}>{children}</VBox>
      ) : (
        <HBox {...content}>{children}</HBox>
      )}
    </>
  );
};

export default VBoxHBox;
