/* eslint-disable no-unused-vars */
import { Merged } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
export const MergedMesh = () => {
  const three = useThree();
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  return (
    <Merged
      ref={ref}
      position={[1, 1, 1]}
      meshes={[
        new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0xffff00 })
        ),
        new THREE.Mesh(
          new THREE.SphereGeometry(1),
          new THREE.MeshStandardMaterial({ color: 0xff0000 })
        ),
      ]}
    >
      {(Box, Sphere) => (
        <>
          <Box position={[-1, -2, 0]} />
          <Sphere position={[1, -1, 0]} />
          <Box position={[-3, -3, 0]} />
          <Box position={[-3, -5, 0]} />
        </>
      )}
    </Merged>
  );
};
