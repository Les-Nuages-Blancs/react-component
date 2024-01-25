import React, { useLayoutEffect, useRef, useState } from "react";
import TextureRect from "./TextureRect";

const NinePatchRect = ({
  width = "100%",
  height = "100%",
  top = 65,
  bottom = 65,
  left = 65,
  right = 65,
  src = "https://media.discordapp.net/attachments/1199345400084172800/1199348012250570842/GUI2FninePatch2Fbox.png?ex=65c236e0&is=65afc1e0&hm=3ae1c3a825f9a5dc2c38566fb802f38fe48d3c5d5a22162409d8b8c782237040&=&format=webp&quality=lossless&width=976&height=670",
  imageSizeX = 915,
  imageSizeY = 628,
  editMode = false,
  editColor = "#0f0",
  style,
  centerStyle = {},
  children,
  ...content
}) => {
  const ref = useRef(null);
  const [imageSize] = useState({ x: imageSizeX, y: imageSizeY });
  const [cases, setCases] = useState([]);

  useLayoutEffect(() => {
    const createCase = (row, column, actualSize, bonusStyle = {}) => {
      const editorStyle = {};

      const ratio = {
        x: (actualSize.x - left - right) / (imageSize.x - left - right),
        y: (actualSize.y - top - bottom) / (imageSize.y - top - bottom),
      };
      let size = {
        x: imageSize.x,
        y: imageSize.y,
      };
      let position = {
        x: column,
        y: row,
      };

      switch (row) {
        case "top":
          editorStyle.borderBottom = "solid 1px " + editColor;
          break;
        case "center":
          editorStyle.borderBottom = "solid 1px " + editColor;
          size.y = imageSize.y * ratio.y;
          position.y = `calc(50% - ${((top - bottom) * ratio.y) / 2}px)`;
          break;
        case "bottom":
          break;
        default:
      }

      switch (column) {
        case "left":
          editorStyle.borderRight = "solid 1px " + editColor;
          break;
        case "center":
          editorStyle.borderRight = "solid 1px " + editColor;
          size.x = imageSize.x * ratio.x;
          position.x = `calc(50% - ${((left - right) * ratio.x) / 2}px)`;
          break;
        case "right":
          break;
        default:
      }

      let caseStyle = {};
      if (editMode) {
        caseStyle = { ...caseStyle, ...editorStyle };
      }
      if (row === column) {
        caseStyle = { ...caseStyle, overflow: "hidden" };
      }

      return (
        <TextureRect
          key={row + "-" + column}
          className={row + "-" + column}
          texture={src}
          size={size.x + "px " + size.y + "px"}
          positionX={position.x}
          positionY={position.y}
          style={{ ...caseStyle, ...bonusStyle }}
        >
          {row === column && children}
        </TextureRect>
      );
    };

    const handleResize = (newWidth, newHeight) => {
      if (ref.current) {
        const actualSize = { x: newWidth, y: newHeight };
        const newCases = [
          createCase("top", "left", actualSize),
          createCase("top", "center", actualSize),
          createCase("top", "right", actualSize),

          createCase("center", "left", actualSize),
          createCase("center", "center", actualSize, centerStyle),
          createCase("center", "right", actualSize),

          createCase("bottom", "left", actualSize),
          createCase("bottom", "center", actualSize),
          createCase("bottom", "right", actualSize),
        ];
        setCases(newCases);
      }
    };

    if (ref.current) {
      const element = ref.current;
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === element) {
            const newWidth = entry.contentRect.width;
            const newHeight = entry.contentRect.height;
            handleResize(newWidth, newHeight);
          }
        }
      });

      //window.addEventListener("resize", handleWindowResize);
      resizeObserver.observe(element);

      return () => {
        //window.removeEventListener("resize", handleWindowResize);
        resizeObserver.unobserve(element); // Use the captured variable
      };
    }
  }, [
    children,
    bottom,
    editMode,
    imageSize.x,
    imageSize.y,
    left,
    right,
    top,
    src,
    editColor,
  ]); // No dependencies needed

  return (
    <div
      className="ninePatchRect"
      ref={ref}
      style={{
        /*width: actualSize.x + "px",
          height: actualSize.y + "px",*/
        width,
        height,
        display: "grid",
        gridTemplateColumns: `${left}px 1fr ${right}px`,
        gridTemplateRows: `${top}px 1fr ${bottom}px`,
        ...style,
      }}
      {...content}
    >
      {cases}
    </div>
  );
};

export default NinePatchRect;
