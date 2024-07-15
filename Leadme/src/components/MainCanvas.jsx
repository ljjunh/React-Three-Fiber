import { ScrollControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Dancer } from "./Dancer";
import { House } from "./House";
import { Suspense } from "react";
import { Loader } from "./Loader";
export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{ background: new THREE.Color(0x000000) }}
    >
      <ScrollControls pages={8} damping={0.5}>
        <Suspense fallback={<Loader />}>
          <Dancer />
          {/* <House /> */}
        </Suspense>
      </ScrollControls>
    </Canvas>
  );
};
