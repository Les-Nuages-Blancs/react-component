import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";

import { jsx, jsxs, Fragment } from "react/jsx-runtime"; // <-- la bonne importation
import Text from "./Text";
import ColorRect from "../../containers/box/ColorRect";
import Image from "./Image";
import InnerLink from "../../containers/utils/InnerLink";
import MarginContainer from "../../containers/box/MarginContainer";
import Video from "./Video";
import YoutubeVideo from "./YoutubeVideo";
import Link from "../../containers/utils/Link";

// Helper function to replace custom blocks like :::margin
const replaceCustomBlocks = (markdownText) => {
  return markdownText
    .replace(/:::(margin)\{([^}]+)\}([\s\S]*?):::/g, (match, p1, p2, p3) => {
      return `<margin ${p2}>${p3}</margin>`;
    })
    .replace(/:::(color)\{([^}]+)\}([\s\S]*?):::/g, (match, p1, p2, p3) => {
      return `<color ${p2}>${p3}</color>`;
    });
};

const MarkdownRenderer = ({
  markdownText,
  h1FontSize = "48px",
  h2FontSize = "36px",
  h3FontSize = "30px",
  h4FontSize = "24px",
  h5FontSize = "20px",
  h6FontSize = "18px",
  textFontSize = "16px",
  h1FontWeight = "bold",
  h2FontWeight = "bold",
  h3FontWeight = "bold",
  h4FontWeight = "bold",
  h5FontWeight = "bold",
  h6FontWeight = "bold",
  textFontWeight = "inherit",
  textFontFamily = "inherit",
  textFontColor = "inherit",
  separatorColor = "lightgrey",
  separatorHeight = "2px",
  separatorMargin = "10px",
  codeBackgroundColor = "#666",
  codePadding = "10px",
  codeFontColor = "#bed5e1",
  codeFontWeight = "bold",
  codeFontFamily = "monospace",
  linkStyle = {},
  style = {},
  ...props
}) => {
  const processedMarkdown = replaceCustomBlocks(markdownText);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeReact, {
      jsx, // <-- ici
      jsxs, // <-- ici
      Fragment, // <-- ici
      components: {
        h1: (props) => (
          <Text
            fontSize={h1FontSize}
            fontWeight={h1FontWeight}
            fontFamily={textFontFamily}
            color={textFontColor}
            {...props}
          />
        ),
        h2: (props) => (
          <Text
            fontSize={h2FontSize}
            fontWeight={h2FontWeight}
            fontFamily={textFontFamily}
            color={textFontColor}
            {...props}
          />
        ),
        h3: (props) => (
          <Text
            fontSize={h3FontSize}
            fontWeight={h3FontWeight}
            fontFamily={textFontFamily}
            color={textFontColor}
            {...props}
          />
        ),
        h4: (props) => (
          <Text
            fontSize={h4FontSize}
            fontWeight={h4FontWeight}
            fontFamily={textFontFamily}
            color={textFontColor}
            {...props}
          />
        ),
        h5: (props) => (
          <Text
            fontSize={h5FontSize}
            fontWeight={h5FontWeight}
            fontFamily={textFontFamily}
            color={textFontColor}
            {...props}
          />
        ),
        h6: (props) => (
          <Text
            fontSize={h6FontSize}
            fontWeight={h6FontWeight}
            fontFamily={textFontFamily}
            color={textFontColor}
            {...props}
          />
        ),
        p: (props) => (
          <Text
            fontFamily={textFontFamily}
            fontSize={textFontSize}
            fontWeight={textFontWeight}
            color={textFontColor}
            {...props}
          />
        ),
        img: (props) => <Image {...props} />,
        video: (props) => <Video {...props} />,
        youtube: (props) => <YoutubeVideo {...props} />,
        a: (props) => <Link {...props} style={linkStyle} />,
        innerLink: (props) => <InnerLink {...props} />,
        ul: (props) => (
          <Text
            fontFamily={textFontFamily}
            color={textFontColor}
            fontSize={textFontSize}
            fontWeight={textFontWeight}
            {...props}
          />
        ),
        hr: () => (
          <MarginContainer
            margin={separatorMargin}
            marginLeft="0"
            marginRight="0"
          >
            <ColorRect backgroundColor={separatorColor}>
              <MarginContainer margin={separatorHeight} />
            </ColorRect>
          </MarginContainer>
        ),
        code: (props) => (
          <ColorRect
            backgroundColor={codeBackgroundColor}
            padding={codePadding}
            style={{ display: "inline", borderRadius: "5px" }}
          >
            <MarginContainer
              margin={codePadding}
              marginTop={"0"}
              marginBottom={"0"}
              style={{ display: "inline" }}
            >
              <Text
                fontFamily={codeFontFamily}
                fontWeight={codeFontWeight}
                color={codeFontColor}
                fontSize={textFontSize}
                style={{ whiteSpace: "pre-wrap", display: "inline" }}
                {...props}
              />
            </MarginContainer>
          </ColorRect>
        ),
        // Custom parsing logic
        margin: (props) => {
          return (
            <MarginContainer {...props}>
              {props.children && (
                <MarkdownRenderer markdownText={props.children} />
              )}
            </MarginContainer>
          );
        },
        color: (props) => {
          const color = props.attributes && props.attributes.color;
          return (
            <ColorRect backgroundColor={color || "lightblue"} {...props}>
              {props.children && (
                <MarkdownRenderer markdownText={props.children} />
              )}
            </ColorRect>
          );
        },
      },
    });

  const renderedContent = processor.processSync(processedMarkdown).result;

  return (
    <div style={style} {...props}>
      {renderedContent}
    </div>
  );
};

export default MarkdownRenderer;
