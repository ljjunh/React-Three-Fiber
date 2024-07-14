import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";

const name = "ground-steak";

export const Steak = () => {
  const ref = useRef(null);
  const { scene } = useGLTF("/models/Steak.glb");

  const position = useMemo(() => new Vector3(-8, 0, -2), []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);

  return (
    <primitive
      ref={ref}
      visible
      name={name}
      position={position}
      object={scene}
    />
  );
};
