import React, { useEffect, useState } from "react";
import VBox from "../box/VBox";
import CenterContainer from "../box/CenterContainer";

const Loader = ({
  delay = 3000,
  style = {},
  circleStyle = {},
  margin = "30px",
  ...content
}) => {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const defaultCircleStyle = {
    width: "50px",
    height: "50px",
    border: "4px solid #ccc",
    borderTopColor: "#000",
    borderRadius: "50%",
    animation: "rotation 1s linear infinite",
  };

  const keyframes = `
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  const [serverStarting, setServerStarting] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayFunctionCall = setTimeout(() => {
        setServerStarting(true);
      }, delay);

      return () => {
        clearTimeout(delayFunctionCall);
      };
    }
  }, []);

  return (
    <div>
      <style>{keyframes}</style>
      <div style={{ ...loaderStyle, ...style }} {...content}>
        <VBox>
          <CenterContainer style={{ margin }}>
            <div style={{ ...defaultCircleStyle, ...circleStyle }}></div>
          </CenterContainer>
          {serverStarting && (
            <>
              <h1 style={{ margin: 0 }}>Server is Certainly Starting</h1>
              <h3 style={{ margin: 0 }}>it can take 1 minute</h3>
            </>
          )}
        </VBox>
      </div>
    </div>
  );
};

export default Loader;
