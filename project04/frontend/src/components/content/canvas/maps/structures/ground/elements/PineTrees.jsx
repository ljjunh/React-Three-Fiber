import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";

const name = "ground-pint-trees";

export const PineTrees = ({ position }) => {
  const { scene: scene_ } = useGLTF("/models/Pine Trees.glb");

  const scene = useMemo(() => {
    return SkeletonUtils.clone(scene_);
  }, []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  return (
    <primitive
      visible
      name={name}
      scale={15}
      position={position}
      rotation-y={Math.PI / 4}
      object={scene}
    />
  );
};
