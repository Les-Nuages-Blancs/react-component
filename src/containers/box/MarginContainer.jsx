import React from "react";

const MarginContainer = ({
  margin = 0,
  marginLeft = margin,
  marginRight = margin,
  marginTop = margin,
  marginBottom = margin,
  // children
  children,
  // style
  style,
  // other props
  ...content
}) => {
  return (
    <div
      className="marginContainer"
      style={{
        paddingLeft: marginLeft ? marginLeft : margin,
        paddingRight: marginRight ? marginRight : margin,
        paddingTop: marginTop ? marginTop : margin,
        paddingBottom: marginBottom ? marginBottom : margin,
        ...style,
      }}
      {...content}
    >
      {children}
    </div>
  );
};

export default MarginContainer;
