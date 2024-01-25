import React, { useState } from "react";
import VBox from "../VBox";
import InfiniteCarousel from "./InfiniteCarousel";
import HBox from "../HBox";
import ButtonWithHover from "../../../components/frontComponents/ButtonWithHover";
import MarginContainer from "../MarginContainer";
import InnerLink from "../../utils/InnerLink";
import Text from "../../../components/frontComponents/Text";

const ShowMoreCarousel = ({
  normalImage = "articleArrow.png",
  hoverImage = "articleArrowHover.png",
  switchRotation = false,
  switchDirection = false,
  rotationOffset = "90deg",
  linkTo = "",
  more = "more",
  children,
  ...content
}) => {
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  return (
    <VBox className="showMoreCarousel">
      <InfiniteCarousel
        {...content}
        moveLeftState={[moveLeft, setMoveLeft]}
        moveRightState={[moveRight, setMoveRight]}
        style={{}}
        switchDirection={switchDirection}
      >
        {children}
      </InfiniteCarousel>
      {children && children.length && children.length > 1 && (
        <MarginContainer margin={"20px"}>
          <HBox justifyContent="right" gap="20px">
            <HBox gap="20px">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  transform:
                    "rotate(calc(" +
                    rotationOffset +
                    " + " +
                    (switchRotation ? 0 : 180) +
                    "deg))",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  transform:
                    "rotate(calc(" +
                    rotationOffset +
                    " + " +
                    (switchRotation ? 180 : 0) +
                    "deg))",
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
            {linkTo && (
              <HBox gap="5px">
                <MarginContainer marginTop={"6px"} marginBottom={"6px"}>
                  <div style={{ border: "1px solid #fff", height: "100%" }} />
                </MarginContainer>

                <InnerLink to={linkTo}>
                  <Text text={more} fontWeight="bold" />
                </InnerLink>
              </HBox>
            )}
          </HBox>
        </MarginContainer>
      )}
    </VBox>
  );
};

export default ShowMoreCarousel;
