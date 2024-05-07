import React from "react";

const VBox = ({
  gap = "0px",
  width = "auto",
  height = "auto",
  justifyContent = "inherit",
  // children
  children,
  // style
  style,
  mainBoxStyle,
  customWraperStyles = [],
  // other props
  ...content
}) => {
  return (
    <div
      className="vBox"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent,
        gap: gap,
        width,
        height,
        ...mainBoxStyle,
      }}
      {...content}
    >
      {children && children.length > 1 ? (
        children.map((child, index) => {
          return (
            <div
              className="vBoxFragment"
              style={{
                ...style,
                ...(customWraperStyles.length > index
                  ? customWraperStyles[index]
                  : {}),
              }}
              key={index}
            >
              {child}
            </div>
          );
        })
      ) : (
        <div className="vBoxFragment" style={{ ...style }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default VBox;
