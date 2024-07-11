/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { Meshes } from "./Meshes";
import { Lights } from "./Lights";
import { Controls } from "./Controls";
import { Dancer } from "./Dancer";
export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }} //안티앨리어싱 활성화(이미지 가장자리 부드럽게
      shadows
      camera={{
        fov: 60, // 시야각 60도
        aspect: window.innerWidth / window.innerHeight, //카메라 종횡비
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{ background: new Color(0x000000) }}
    >
      <Controls />
      <Lights />
      <Meshes />
      {/* <GLBModel /> */}
      <Dancer />
    </Canvas>
  );
};
