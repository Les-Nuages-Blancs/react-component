import React, { useState } from "react";
import HBox from "../HBox";
import ButtonWithHover from "../../../components/frontComponents/ButtonWithHover";
import VBox from "../VBox";
import InfiniteCarousel from "./InfiniteCarousel";

const CircleCarousel = ({
  normalImage = "https://github.com/liro-u/react-component/blob/main/assets/arrow.png?raw=true",
  hoverImage = "",
  switchRotation = false,
  switchDirection = false,
  switchSquareDirection = false,
  showSquare = true,
  squareImageNormal = "https://github.com/liro-u/react-component/blob/main/assets/voidSquare.png?raw=true",
  squareImageSelected = "https://github.com/liro-u/react-component/blob/main/assets/square.png?raw=true",
  squareImageHover = "",
  children,
  ...content
}) => {
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderVariableStyle = (isActive, isRight, isNext) => {
    return {
      transform:
        "translateX(" +
        (isActive ? "0px" : isRight ? "20%" : "-20%") +
        ") scale(" +
        (isActive ? 1 : isNext ? 0.76 : 0.51) +
        ")",
      zIndex: isActive ? 2 : isNext ? 1 : 0,
      opacity: isActive || isNext ? 1 : 0,
    };
  };

  const buildSquare = (array) => {
    return array.map((child, index) => {
      const isActive = switchSquareDirection
        ? currentIndex === array.length - 1 - index
        : currentIndex === index;
      return (
        <ButtonWithHover
          style={{
            cursor: "pointer",
          }}
          key={index}
          onClick={(e) =>
            setCurrentIndex(
              switchSquareDirection ? array.length - 1 - index : index
            )
          }
          normalImage={isActive ? squareImageSelected : squareImageNormal}
          hoverImage={
            squareImageHover && squareImageHover !== ""
              ? squareImageHover
              : squareImageSelected
          }
        />
      );
    });
  };

  return (
    <VBox>
      <HBox
        className="circleCarousel"
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transform: "rotate(" + (switchRotation ? 0 : 180) + "deg)",
            zIndex: 10,
          }}
        >
          <ButtonWithHover
            normalImage={normalImage}
            hoverImage={hoverImage}
            onClick={switchDirection ? setMoveRight : setMoveLeft}
            style={{ cursor: "pointer" }}
          />
        </div>
        <InfiniteCarousel
          {...content}
          moveLeftState={[moveLeft, setMoveLeft]}
          moveRightState={[moveRight, setMoveRight]}
          onCurrentIndexChange={setCurrentIndex}
          newCurrentIndex={currentIndex}
          switchDirection={switchDirection}
          renderVariableStyle={renderVariableStyle}
          style={{ overflow: "visible" }}
        >
          {children}
        </InfiniteCarousel>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transform: "rotate(" + (switchRotation ? 180 : 0) + "deg)",
            zIndex: 10,
          }}
        >
          <ButtonWithHover
            normalImage={normalImage}
            hoverImage={hoverImage}
            onClick={switchDirection ? setMoveLeft : setMoveRight}
            style={{ cursor: "pointer" }}
          />
        </div>
      </HBox>
      {showSquare && (
        <HBox
          style={{
            justifyContent: "center",
          }}
        >
          {children && buildSquare(children)}
        </HBox>
      )}
    </VBox>
  );
};

export default CircleCarousel;
