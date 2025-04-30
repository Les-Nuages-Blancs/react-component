import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";

import { jsx, jsxs, Fragment } from "react/jsx-runtime"; // <-- la bonne importation
import Text from "./TextChildren";
import {
  ColorRect,
  Image,
  InnerLink,
  MarginContainer,
  Video,
  YoutubeVideo,
  Link,
} from "@liro_u/react-components";

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

const MarkdownRenderer = ({ markdownText }) => {
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
        h1: (props) => <Text fontSize="48px" fontWeight="bold" {...props} />,
        h2: (props) => <Text fontSize="36px" fontWeight="bold" {...props} />,
        h3: (props) => <Text fontSize="30px" fontWeight="bold" {...props} />,
        h4: (props) => <Text fontSize="24px" fontWeight="bold" {...props} />,
        h5: (props) => <Text fontSize="20px" fontWeight="bold" {...props} />,
        h6: (props) => <Text fontSize="18px" fontWeight="bold" {...props} />,
        p: (props) => <Text {...props} />,
        img: (props) => <Image {...props} />,
        video: (props) => <Video {...props} />,
        iframe: (props) => <YoutubeVideo {...props} />,
        a: (props) => <Link {...props} />,
        link: (props) => <InnerLink {...props} />,
        ul: (props) => <Text {...props} />,
        hr: () => (
          <MarginContainer margin="10px" marginLeft="0" marginRight="0">
            <ColorRect backgroundColor="lightgrey">
              <MarginContainer margin="2px" />
            </ColorRect>
          </MarginContainer>
        ),
        code: (props) => (
          <ColorRect
            backgroundColor="#666"
            padding="10px"
            borderRadius="8px"
            style={{ display: "inline", borderRadius: "5px" }}
          >
            <MarginContainer
              margin={"10px"}
              marginTop={"0"}
              marginBottom={"0"}
              style={{ display: "inline" }}
            >
              <Text
                fontFamily="monospace"
                fontWeight="bold"
                color="#bed5e1"
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

  return <div>{renderedContent}</div>;
};

export default MarkdownRenderer;
