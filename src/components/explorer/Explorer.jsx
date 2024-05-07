import React, { useEffect, useState } from "react";
import MarginContainer from "../../containers/box/MarginContainer";
import VBox from "../../containers/box/VBox";
import HBox from "../../containers/box/HBox";
import Icon from "../frontComponents/Icon";
import Text from "../frontComponents/Text";
import GridContainer from "../../containers/box/GridContainer";
import FolderButton from "./FolderButton";
import DocumentButton from "./DocumentButton";

const Explorer = ({
  currentPath,
  setCurrentPath,
  folders,
  documents,
  currentDocument,
  setCurrentDocument,
  ...content
}) => {
  const [fileButtons, setFileButtons] = useState([]);
  const [isHover, setIsHover] = useState(false);

  const handleHover = (hoverBool) => {
    setIsHover(hoverBool);
  };

  const goBack = (p) => {
    const lastSlashIndex = p.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      setCurrentPath(p.substring(0, lastSlashIndex));
    } else {
      setCurrentPath("");
    }
  };

  useEffect(() => {
    const tempChild = [];
    if (folders && folders.length && folders.length > 0) {
      folders.forEach((folder, index) => {
        tempChild.push(
          <FolderButton
            onClick={() => setCurrentPath(folder.path)}
            path={folder.path}
            title={folder.path.split("/")[folder.path.split("/").length - 1]}
            key={"folder-" + index}
          />
        );
      });
    }
    if (documents && documents.length && documents.length > 0) {
      documents.forEach((document, index) => {
        tempChild.push(
          <DocumentButton
            onClick={() => setCurrentDocument(document)}
            src={document.downloadURL}
            title={
              document.path.split("/")[document.path.split("/").length - 1]
            }
            key={"document-" + index}
          />
        );
      });
    }
    setFileButtons(tempChild);
  }, [folders, documents]);

  return (
    <MarginContainer margin={"30px"} {...content}>
      <VBox gap="10px">
        <HBox
          gap="10px"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <MarginContainer margin={"5px"}>
            <Text
              text={"selected path :"}
              fontSize="large"
              style={{
                textAlign: "left",
              }}
            />
          </MarginContainer>
          {currentDocument && (
            <MarginContainer
              onClick={() => goBack(currentDocument.path)}
              margin={"5px"}
              style={{
                borderRadius: "10px",
                border: "solid 1px",
                flexGrow: 1,
                cursor: "pointer",
              }}
            >
              <Text
                text={
                  isHover
                    ? currentDocument.path
                    : currentDocument.path.split("/")[
                        currentDocument.path.split("/").length - 1
                      ]
                }
                fontSize="large"
                style={{
                  textAlign: "left",
                }}
              />
            </MarginContainer>
          )}
        </HBox>
        <HBox gap="10px">
          <Icon
            iconName="arrow_back"
            onClick={() => goBack(currentPath)}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          />

          <MarginContainer
            margin={"5px"}
            style={{
              borderRadius: "10px",
              border: "solid 1px",
              flexGrow: 1,
            }}
          >
            <Text
              text={currentPath}
              fontSize="large"
              style={{
                textAlign: "left",
              }}
            />
          </MarginContainer>
        </HBox>
        <GridContainer
          maxShow={-1}
          nbColumn={7}
          style={{ textAlign: "left", overflow: "auto", height: "30vh" }}
        >
          {fileButtons && fileButtons}
        </GridContainer>
      </VBox>
    </MarginContainer>
  );
};

export default Explorer;
