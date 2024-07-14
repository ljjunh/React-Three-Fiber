import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { NicknameBoard } from "../../3dUIs/NicknameBoard";
import { useFrame } from "@react-three/fiber";

const name = "ground-npc-zombie";

export const Zombie = () => {
  const ref = useRef(null);
  const nameRef = useRef(null);
  const { scene, animations } = useGLTF("/models/Zombie.glb");

  const { actions } = useAnimations(animations, ref);

  const position = useMemo(() => new Vector3(-5, 0, -6), []);

  const [currentAnimation, setCurrentAnimation] = useState(
    "EnemyArmature|EnemyArmature|EnemyArmature|Attack"
  );

  useEffect(() => {
    if (!ref.current) return;
    nameRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4,
      ref.current.position.z
    );
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions[currentAnimation]?.play().setDuration(0.8);
    return () => {
      actions[animations]?.stop();
    };
  }, [actions, animations, currentAnimation, scene]);

  useFrame(() => {
    nameRef.current.lookAt(new Vector3(10000, 10000, 10000));
  });

  return (
    <>
      <NicknameBoard ref={nameRef} text="야근좀비" isNpc />
      <primitive
        scale={1.2}
        ref={ref}
        visible
        name={name}
        position={position}
        object={scene}
      />
    </>
  );
};
