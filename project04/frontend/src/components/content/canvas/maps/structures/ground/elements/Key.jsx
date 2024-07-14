import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";

const name = "ground-key"; // 3D 객체의 이름을 정의

export const Key = () => {
  const ref = useRef(null); // 3D 객체에 대한 참조 생성

  const { scene } = useGLTF("/models/Key.glb"); // useGLTF 훅을  통해 3D모델을 로드하고 그중 scene만 추출

  const position = useMemo(() => new Vector3(22, 1, -18), []);
  // 키의 위치를 Vector3 객체로 메모이제이션

  useEffect(() => {
    scene.traverse((mesh) => {
      // 3D모델의 모든 mesh를 순회하며 그림자 설정
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    if (ref.current) {
      gsap.to(ref.current.rotation, {
        //gsap을 사용해서 3d객체의 회전 애니메이션 설정
        duration: 3,
        repeat: -1,
        repeatDelay: 0,
        y: Math.PI * 6,
      });
    }
  }, [scene, position]);

  return (
    <>
      <rectAreaLight
        args={["yellow", 30, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      />
      <primitive
        visible
        name={name}
        scale={1}
        position={position}
        ref={ref}
        rotation-z={Math.PI / 2.5}
        object={scene}
      />
    </>
  );
};
