import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { useRecoilState } from "recoil";
import { Vector3 } from "three";
import {
  PlayerCompletedQuestAtom,
  PlayerInventoryAtom,
} from "../../../../../../../store/PlayersAtom";

const name = "ground-wood-chest";

export const WoodChest = () => {
  const ref = useRef(null);
  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom); // 플레이어 인벤토리 불러오기

  const [playerCompletedQuests, setPlayerCompletedQuests] = useRecoilState(
    PlayerCompletedQuestAtom
  ); // 플레이어 퀘스트 완료 여부 불러오기

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

  if (playerCompletedQuests.includes("treasure")) {
    return null;
  }

  return (
    <>
      <rectAreaLight
        args={["yellow", 50, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      />
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          if (playerInventory.includes("key")) {
            alert("조기 퇴근권을 획득했습니다. 야근좀비의 퇴근을 도와주세요!");
            setPlayerInventory((prev) => [
              ...prev.filter((item) => item !== "key"),
              "ticket",
            ]);
            setPlayerCompletedQuests((prev) => [...prev, "treasure"]);
          } else {
            alert("열쇠가 필요합니다!");
          }
        }}
        ref={ref}
        name={name}
        scale={1}
        position={position}
        object={scene}
      />
    </>
  );
};
