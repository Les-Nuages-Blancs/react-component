import React from "react";
import { Link } from "react-router-dom";

const ActivableLink = ({ disabled = false, children, style, ...content }) => {
  return (
    <div style={style}>
      {!disabled ? (
        <Link {...content}>{children}</Link>
      ) : (
        <span {...content}>{children}</span>
      )}
    </div>
  );
};

export default ActivableLink;
