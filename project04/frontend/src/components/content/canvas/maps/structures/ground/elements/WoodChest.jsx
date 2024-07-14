import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { repeat } from "lodash-es";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";

const name = "ground-wood-chest";

export const WoodChest = () => {
  const ref = useRef(null);
  const { scene } = useGLTF("/models/Wood Chest.glb");

  const position = useMemo(() => new Vector3(8, 0, 0), []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.scale, {
        yoyo: true,
        repeat: -1,
        x: 1.1,
        y: 1.1,
        z: 1.1,
      });
    }
  }, []);

  return (
    <>
      <rectAreaLight
        args={["yellow", 50, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      />
      <primitive
        ref={ref}
        name={name}
        scale={1}
        position={position}
        object={scene}
      />
    </>
  );
};
