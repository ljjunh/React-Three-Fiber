import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const House = () => {
  const { scene } = useGLTF("/models/house.glb");
  useEffect(() => {
    scene.traverse((mesh) => {
      if (mesh.isMesh) {
        mesh.receiveShadow = true;
        mesh.castShadow = true;
      }
    });
  }, [scene]);
  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <hemisphereLight intensity={0.3} />
      <primitive object={scene} scale={0.5} />
    </>
  );
};
