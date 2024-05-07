import React, { cloneElement, useEffect, useState } from "react";
import VBox from "./VBox";
import ButtonWithHover from "../../components/frontComponents/ButtonWithHover";
import CenterContainer from "./CenterContainer";

const GridContainer = ({
  nbColumn = 5,
  margin = "50px",
  maxShow = 10,
  randomize = false,
  less = "less",
  more = "more",
  fontSize,
  style,
  children,
  ...content
}) => {
  const [copyChildren, setCopyChildren] = useState(false);
  const [ignoreLimit, setIgnoreLimit] = useState(false);
  const [needShowMore, setNeedShowMore] = useState(false);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setCopyChildren(
      randomize ? [...children].sort(() => 0.5 - Math.random()) : children
    );
  }, [children, randomize]);

  useEffect(() => {
    const buildCases = (array) => {
      return array.map((child, index) => {
        const newStyle = {
          ...child.props.style,
          display:
            index < maxShow || ignoreLimit || maxShow < 0
              ? child.props.style
                ? child.props.style.display
                : "inline-table"
              : "none",
          width:
            "calc(calc(100% - calc(" +
            nbColumn +
            " * " +
            margin +
            ")) / " +
            nbColumn +
            ")",
          height: "unset",
          aspectRatio: "1 / 1",
          margin: "calc(" + margin + " / 2)",
        };
        return cloneElement(child, {
          key: index,
          style: newStyle,
        });
      });
    };
    if (copyChildren) {
      setCases(buildCases([...copyChildren]));
      if (copyChildren && copyChildren.length) {
        setNeedShowMore(copyChildren.length > maxShow);
      }
    }
  }, [copyChildren, ignoreLimit, margin, maxShow, nbColumn]);

  return (
    <VBox mainBoxStyle={style} {...content}>
      <div className="GridContainer">{cases}</div>
      {needShowMore && maxShow >= 0 && (
        <CenterContainer>
          <ButtonWithHover
            style={{ cursor: "pointer" }}
            fontSize={fontSize}
            text={ignoreLimit ? less : more}
            onClick={() => setIgnoreLimit(!ignoreLimit)}
          />
        </CenterContainer>
      )}
    </VBox>
  );
};

export default GridContainer;
