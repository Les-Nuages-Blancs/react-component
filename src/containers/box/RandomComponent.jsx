import React, { useCallback, useEffect, useState } from "react";

const RandomComponent = ({
  activeImage,
  randomButton = true,
  forceNewOnRandomButton = true,
  randomButtonStyle = {},
  style,
  children,
}) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const getRandomComponent = useCallback(
    (children, forceDifferent = false) => {
      if (children) {
        if (children.length === 1) {
          return children;
        } else {
          let index = activeImage;
          if (activeImage < 0 || activeImage >= children.length) {
            let possibleIndex = null;
            do {
              possibleIndex = Math.floor(Math.random() * children.length);
            } while (forceDifferent && index === possibleIndex);
            index = possibleIndex;
          }
          return children[index];
        }
      } else {
        return null;
      }
    },
    [activeImage]
  );

  useEffect(() => {
    setActiveComponent(getRandomComponent(children));
  }, [children, getRandomComponent]);

  return (
    <div
      style={{
        position: "relative",
        ...style,
      }}
    >
      {randomButton && (
        <span
          className="material-symbols-outlined"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: "10px 10px",
            padding: "10px",
            fontSize: "xxx-large",
            color: "#fff",
            background: "#bbb3",
            borderRadius: "100%",
            cursor: "pointer",
            ...randomButtonStyle,
          }}
          onClick={() =>
            setActiveComponent(
              getRandomComponent(children),
              forceNewOnRandomButton
            )
          }
        >
          refresh
        </span>
      )}
      {activeComponent}
    </div>
  );
};

export default RandomComponent;
