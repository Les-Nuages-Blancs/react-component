import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

import { Text } from "@liro_u/react-components";

/*
 * test with those url
 * fbx: /fbx/source/sketchfab_v002.fbx
 * obj: /obj/source/Datsun_280Z.obj
 * glb: /glb/concerto.glb
 * glb2: https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb
 * gltf: /gltf/scene.gltf
 */
const ModelViewer = ({
  modelUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
  width = "50%",
  height = "500px",
  directionalLightPosition = { pos: [2, 2, 5] },
  cameraPosition = { pos: [0, 0, 5] },
  ambientLightIntensity = 0.5,
  enableControl = true,
  loadingFallback = null,
  errorFallback = "⚠️ Failed to load model.",
  backgroundColor = "#DAF7A6",
  style = {},
  ...props
}) => {
  const [scene, setScene] = useState(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      setError(null);
      setReady(false);
      setScene(null);

      const extension = modelUrl.split(".").pop().toLowerCase();
      let loader;

      try {
        switch (extension) {
          case "glb":
          case "gltf":
            loader = new GLTFLoader();
            break;
          case "fbx":
            loader = new FBXLoader();
            break;
          case "obj":
            loader = new OBJLoader();
            break;
          default:
            throw new Error(`Unsupported file format: ${extension}`);
        }

        const loaded = await loader.loadAsync(modelUrl);
        if (isMounted) {
          setScene(loaded.scene || loaded);
          setReady(true);
        }
      } catch (err) {
        console.error("Model load error:", err);
        if (isMounted) setError(err);
      }
    };

    loadModel();

    return () => {
      isMounted = false;
    };
  }, [modelUrl]);

  if (error) return <Text text={errorFallback} />;
  if (!ready) return loadingFallback;

  return (
    <div
      style={{ width, height, background: backgroundColor, ...style }}
      {...props}
    >
      <Canvas camera={{ position: cameraPosition.pos }}>
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight position={directionalLightPosition.pos} />
        <Suspense fallback={null}>
          {scene && <primitive object={scene} dispose={null} />}
        </Suspense>
        {enableControl && <OrbitControls />}
      </Canvas>
    </div>
  );
};

export default ModelViewer;
