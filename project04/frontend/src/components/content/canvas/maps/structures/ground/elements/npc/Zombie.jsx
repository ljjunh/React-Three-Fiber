import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { TextBoard } from "../../3dUIs/TextBoard";
import { useFrame } from "@react-three/fiber";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";
import { useRecoilState } from "recoil";
import {
  PlayerCompletedQuestAtom,
  PlayerInventoryAtom,
} from "../../../../../../../../store/PlayersAtom";

const name = "ground-npc-zombie";
export const Zombie = () => {
  const ref = useRef(null);
  const nameRef = useRef(null);
  const chatRef = useRef(null);
  const [text, setText] = useState("으으 오늘도 야근이라니...    ");
  const { displayText } = useAnimatedText(text);

  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom); // 플레이어 인벤토리 불러오기

  const [playerCompletedQuests, setPlayerCompletedQuests] = useRecoilState(
    PlayerCompletedQuestAtom
  ); // 플레이어 퀘스트 완료 여부 불러오기

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
    chatRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4.5,
      ref.current.position.z
    );
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions[currentAnimation]?.play().setDuration(0.8);
    return () => {
      actions[currentAnimation]?.stop();
    };
  }, [actions, currentAnimation, position, scene]);

  useFrame(() => {
    if (!nameRef.current) return;
    nameRef.current.lookAt(10000, 10000, 10000);
    if (!chatRef.current) return;
    chatRef.current.lookAt(10000, 10000, 10000);

    if (playerCompletedQuests.includes("zombie")) {
      ref.current.lookAt(-50, 0, -50);
      ref.current.position.x -= 0.02;
      ref.current.position.z -= 0.02;

      chatRef.current.position.x -= 0.02;
      chatRef.current.position.z -= 0.02;

      nameRef.current.position.x -= 0.02;
      nameRef.current.position.z -= 0.02;
    }

    if (ref.current.position.x >= 50 || ref.current.position.z >= 50) {
      ref.current.visible = false;
    }
  });

  return (
    <>
      <TextBoard ref={chatRef} text={displayText} />
      <TextBoard ref={nameRef} text="야근좀비" isNpc />
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          if (playerInventory.includes("ticket")) {
            alert("야근좀비를 퇴근시켰습니다!");
            setText("드디어 퇴근이다!!!           ");
            setCurrentAnimation(
              "EnemyArmature|EnemyArmature|EnemyArmature|Run"
            );
            setPlayerInventory((prev) =>
              prev.filter((item) => item !== "ticket")
            );
            setPlayerCompletedQuests((prev) => [...prev, "zombie"]);
          } else {
            alert("보물상자에서 퇴근권을 찾아주세요!");
          }
        }}
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
