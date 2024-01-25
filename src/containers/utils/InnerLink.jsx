import React from "react";
import { Link } from "react-router-dom";

const InnerLink = ({ to = "", children, style, ...content }) => {
  return (
    <Link
      to={to}
      {...content}
      style={{
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </Link>
  );
};

export default InnerLink;
