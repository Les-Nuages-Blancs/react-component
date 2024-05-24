import {
  MarginContainer,
  VBox,
  ColorRect,
  CenterContainer,
  Text,
  Image,
  YoutubeVideo,
  ButtonWithHover,
  Link,
} from "@liro_u/react-components";

function App() {
  return (
    <div className="App">
      <ColorRect backgroundColor="red" style={{ minHeight: "100vh" }}>
        <MarginContainer margin={"50px"}>
          <CenterContainer>
            <VBox gap="20px">
              <Text text="ceci est un test" color="white" />
              <Image src="test.png" />
              <YoutubeVideo />
              <Link href="">
                <ButtonWithHover />
              </Link>
            </VBox>
          </CenterContainer>
        </MarginContainer>
      </ColorRect>
    </div>
  );
}

export default App;
