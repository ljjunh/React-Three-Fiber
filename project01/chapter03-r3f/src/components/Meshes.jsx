/* eslint-disable react/no-unknown-property */
import { Plane } from "@react-three/drei";
export const Meshes = () => {
  return (
    <>
      {/* <mesh position={[1, 0, 0]}>
         <boxGeometry args={[1, 1, 1]} />
         <meshBasicMaterial color={0xff0000} />
      </mesh> */}
      <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>

      {/* <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-3, 1.6, 0]}
        material-color={"teal"}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xff0000} />
      </TorusKnot> */}
    </>
  );
};
