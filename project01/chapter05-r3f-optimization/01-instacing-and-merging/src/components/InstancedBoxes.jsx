/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
const object3D = new THREE.Object3D();
const color = new THREE.Color();
const boxCount = 10000;
const boxSize = [0.2, 0.2, 0.2];

const colorPaletts = ["#00a0b0", "#6a4a3c", "#cc333f", "#eb6841", "#edc951"];

export const InstancedBoxes = () => {
  const ref = useRef(null);

  const colors = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: boxCount }, () =>
          color.set(colorPaletts[Math.floor(Math.random() * 5)]).toArray()
        ).flat()
      ),
    []
  );
  useEffect(() => {
    let i = 0;
    const spaceWidth = Math.round(Math.pow(boxCount, 1 / 3));
    const halfOfSpaceWidth = spaceWidth / 2;

    for (let x = 0; x < spaceWidth; x += 1) {
      for (let y = 0; y < spaceWidth; y += 1) {
        for (let z = 0; z < spaceWidth; z += 1) {
          const id = i++;
          object3D.rotation.set(Math.random(), Math.random(), Math.random());
          object3D.position.set(
            halfOfSpaceWidth - x + Math.random(),
            halfOfSpaceWidth - y + Math.random(),
            halfOfSpaceWidth - z + Math.random()
          );
          object3D.updateMatrix();
          ref.current.setMatrixAt(id, object3D.matrix);
        }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[null, null, boxCount]}>
      <boxGeometry args={boxSize}>
        <instancedBufferAttribute
          attach={"attributes-color"}
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  );
};
