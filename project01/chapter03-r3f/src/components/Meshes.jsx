/* eslint-disable react/no-unknown-property */
import { Box, Sphere } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useEffect } from "react";

export const Meshes = () => {
  const [planeRef] = useBox(() => ({
    args: [50, 1, 50],
    type: "Static",
    mass: 1,
    postition: [0, 0, 0],
    material: {
      restitution: 1,
      friction: 0.5,
    },
    onCollide: () => {
      console.log("바닥에 충돌했다");
    },
  }));

  const [boxRef, api] = useBox(() => ({
    args: [1, 1, 1],
    mass: 1,
    position: [-1, 2, 0],
    material: {
      restitution: 0.4,
      friction: 0.2,
    },
  }));

  const [sphereRef1, sphereApi] = useSphere(() => ({
    mass: 5,
    position: [0.5, 8, 0],
    material: {
      restitution: 0.4,
      friction: 0.1,
    },
  }));

  const [sphereRef2] = useSphere(() => ({
    mass: 0.2,
    position: [1, 5, 0],
    material: {
      restitution: 0.2,
      friction: 0.1,
    },
  }));

  // useEffect(() => {
  //   api.applyForce([555, 50, 0], [1, 0, 0]);
  //   sphereApi.applyLocalForce([-2000, 0, 0], [1, 0, 0]);
  // }, [api, sphereApi]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      api.applyLocalImpulse([0, 20, 0], [1, 0, 0]);
      sphereApi.applyImpulse([200, 10, 0], [0, 0, 0]);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [api, sphereApi]);

  return (
    <>
      <Box ref={planeRef} args={[50, 1, 50]}>
        <meshStandardMaterial
          color={0xfefefe}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Box ref={boxRef} args={[1, 1, 1]} color={0xff0000}>
        <meshStandardMaterial
          color={0xff0000}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Sphere ref={sphereRef1}>
        <meshStandardMaterial
          color={0x9000ff}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
      <Sphere ref={sphereRef2}>
        <meshStandardMaterial
          color={0xff00ff}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </>
  );
};
