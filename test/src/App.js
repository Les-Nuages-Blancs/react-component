import {
  MarginContainer,
  VBox,
  ColorRect,
  CenterContainer,
  Image,
  YoutubeVideo,
  ButtonWithHover,
  Link,
  ModelViewer,
} from "@liro_u/react-components";
import Text from "./TextChildren";

import MarkdownRenderer from "./test";
import MdViewer from "./ModelViewer";

function App() {
  return (
    <div className="App">
      <ColorRect backgroundColor="red" style={{ minHeight: "100vh" }}>
        <MarginContainer margin="50px">
          <CenterContainer>
            <VBox gap="20px">
              <Text text="ceci est un test" color="white" />
              <Text color="white">ceci est un test avec enfant</Text>
              <Image src="test.png" />
              <YoutubeVideo />
              <Link href="">
                <ButtonWithHover />
              </Link>
              <ModelViewer />
              <MdViewer />
              <MarkdownRenderer
                markdownText={`
# Bienvenue dans le MarkdownRenderer 🎉

Ce fichier markdown est **entièrement pensé** pour ton composant React \`MarkdownRenderer\`. Il montre comment chaque élément que tu as mappé est interprété dans l'UI.

---

## Titres

# H1
## H2
### H3
#### H4
##### H5

---

## Texte normal et paragraphe

Ceci est un paragraphe de texte. Il est rendu avec le composant \`Text\` personnalisé, ce qui te permet de mieux contrôler la typographie dans l'app.

---

## 📷 Image

![Demo image](https://picsum.photos/400/200)

---

## 📹 Vidéo

<video src="https://www.w3schools.com/html/mov_bbb.mp4" controls width="300" ></video>

---

## ▶️ Vidéo YouTube

<iframe width="400" height="225" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>

---

## 🔗 Liens

- [Lien externe vers Google](https://google.com)
- [Lien interne](link:/mon-chemin/interne)

---

## ✅ Listes

### Liste à puces

- Premier élément
- Deuxième élément
- Troisième élément

---

## 🔳 Séparateur

---

## 📦 Blocs personnalisés

:::margin{margin="20px"}
This is a text in a Margin.
:::

:::color{color="lightblue"}
This block has a custom background color.
:::

---

## 🧪 Composants React personnalisés

Le support de blocs comme \`HBox\`, \`VBox\`, ou \`ColorRect\` permet une UI dynamique et très propre.

---

Merci d’avoir testé le \`MarkdownRenderer\` 🚀
                `}
              />
            </VBox>
          </CenterContainer>
        </MarginContainer>
      </ColorRect>
    </div>
  );
}

export default App;
