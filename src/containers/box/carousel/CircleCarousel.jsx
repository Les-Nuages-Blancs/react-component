import React, { useState } from "react";
import HBox from "../HBox";
import ButtonWithHover from "../../../components/frontComponents/ButtonWithHover";
import VBox from "../VBox";
import InfiniteCarousel from "./InfiniteCarousel";

const CircleCarousel = ({
  normalImage = "https://media.discordapp.net/attachments/1199345400084172800/1199353157357142076/GUI2FCarousel2FCircle2Farrow.png?ex=65c23bab&is=65afc6ab&hm=26bec987ed00407fc49abcd72aefd92ef3a94bf76f13400e6b851b87c08b192a&=&format=webp&quality=lossless&width=137&height=112",
  hoverImage = "",
  switchRotation = false,
  switchDirection = false,
  switchSquareDirection = false,
  showSquare = true,
  squareImageNormal = "https://media.discordapp.net/attachments/1199345400084172800/1199353311585894460/GUI2FCarousel2FCircle2Fsquare.png?ex=65c23bd0&is=65afc6d0&hm=793ca03b5eca52d8389132364f916b1a07369960223f7c5a7c47ae26748d5b4f&=&format=webp&quality=lossless&width=62&height=62",
  squareImageSelected = "https://media.discordapp.net/attachments/1199345400084172800/1199353413788516563/GUI2FCarousel2FCircle2FsquareSelected.png?ex=65c23be8&is=65afc6e8&hm=c9ab53471bbd6d8ec7fe68d23cb2ad2369c66bc6b21806df36f43a0d7b8493b2&=&format=webp&quality=lossless&width=62&height=62",
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
