import React, { useState, cloneElement, useEffect } from "react";
import HBox from "../HBox";

const InfiniteCarousel = ({
  switchDirection = false,
  autoChange = true,
  width = "500px",
  height = "281px",
  delay = 5000,
  moveLeftState,
  moveRightState,
  newCurrentIndex,
  onCurrentIndexChange,
  renderVariableStyle,
  children,
  style,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (newCurrentIndex !== undefined && newCurrentIndex !== currentIndex) {
      setCurrentIndex(newCurrentIndex);
    }
  }, [newCurrentIndex]);

  useEffect(() => {
    if (onCurrentIndexChange) {
      onCurrentIndexChange(currentIndex);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (moveLeftState && moveLeftState[0]) {
      moveLeftState[1](false);
      moveLeft();
    }
  }, [moveLeftState]);

  useEffect(() => {
    if (moveRightState && moveRightState[0]) {
      moveRightState[1](false);
      moveRight();
    }
  }, [moveRightState]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (autoChange) {
        if (children && children.length > 1) {
          setCurrentIndex(
            switchDirection
              ? (currentIndex - 1 + children.length) % children.length
              : (currentIndex + 1) % children.length
          );
        }
      }
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay, autoChange, currentIndex, children, switchDirection]);

  const moveRight = () => {
    if (children && children.length > 1) {
      setCurrentIndex((currentIndex + 1) % children.length);
    }
  };

  const moveLeft = () => {
    if (children && children.length > 1) {
      setCurrentIndex((currentIndex - 1 + children.length) % children.length);
    }
  };

  const buildSlide = (array) => {
    return array.map((child, index) => {
      const clockwiseDistance =
        (index - currentIndex + array.length) % array.length;
      const counterclockwiseDistance =
        (currentIndex - index + array.length) % array.length;

      const isActive = index === currentIndex;
      const isNext =
        index === (currentIndex - 1 + array.length) % array.length ||
        index === (currentIndex + 1) % array.length;
      const isRight = clockwiseDistance > counterclockwiseDistance;

      let variableStyle = {};
      if (renderVariableStyle) {
        variableStyle = renderVariableStyle(isActive, isRight, isNext);
      } else {
        variableStyle = {
          transform:
            "translateX(" +
            (isActive ? "0px" : isRight ? "100%" : "-100%") +
            ") ",
          zIndex: isActive ? 2 : isNext ? 1 : 0,
        };
      }

      const newStyle = {
        ...child.props.style,
        transition: "all 0.3s",
        position: "absolute",

        ...variableStyle,
      };
      return cloneElement(child, {
        key: index,
        style: newStyle,
      });
    });
  };

  return (
    <HBox
      className="infiniteCarousel"
      style={{
        width,
        height,
        position: "relative",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      {children && buildSlide(children)}
    </HBox>
  );
};

export default InfiniteCarousel;
