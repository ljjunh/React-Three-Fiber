import { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { useRecoilValue } from "recoil";
import { MeAtom } from "../../../../../../store/PlayersAtom";

export const usePlayer = ({ player, position, modelIndex }) => {
  const playerId = player?.id;

  const me = useRecoilValue(MeAtom);

  const memoizedPosition = useMemo(() => position, []);

  const playerRef = useRef(null);
  const nicknameRef = useRef(null);

  const { scene, materials, animations } = useGLTF(
    (() => {
      switch (modelIndex) {
        case 0:
          return "/models/CubeGuyCharacter.glb";
        case 1:
          return "/models/CubeWomanCharacter.glb";
        case 2:
          return "/models/Steve.glb";
        default:
          return "";
      }
    })()
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);

  const objectMap = useGraph(clone);

  const nodes = objectMap.nodes;
  const [animation, setAnimation] = useState(
    "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
  );

  const { actions } = useAnimations(animations, playerRef);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  useFrame(({ camera }) => {
    if (!player) return;
    if (!playerRef.current) return;
    if (playerRef.current.position.distanceTo(position) > 0.1) {
      const direction = playerRef.current.position
        .clone()
        .sub(position)
        .normalize()
        .multiplyScalar(0.04);
      playerRef.current.position.sub(direction);
      playerRef.current.lookAt(position);
      setAnimation("CharacterArmature|CharacterArmature|CharacterArmature|Run");
    } else {
      setAnimation(
        "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
      );
    }

    // 닉네임 달기
    if (nicknameRef.current) {
      nicknameRef.current.position.set(
        playerRef.current.position.x,
        playerRef.current.position.y + 3.5, // 플레이어의 좌표 위에 3.5더해서 플레이어 위에 표시되도록
        playerRef.current.position.z
      );
      nicknameRef.current.lookAt(10000, 10000, 10000);
      //닉네임 요소가 특정 지점을 바라보도록 설정
      // 10000,10000,10000 이렇게 아주 먼 거리의 지점 설정하면
      // 닉네임이 항상 카메라를 향하게 되서 어느 각도에서 보더라도 잘 보이게 됨
    }
    if (me?.id === playerId) {
      camera.position.set(
        playerRef.current.position.x + 12,
        playerRef.current.position.y + 12,
        playerRef.current.position.z + 12
      );
      camera.lookAt(playerRef.current.position);
    }
  });

  return {
    me,
    nicknameRef,
    playerRef,
    memoizedPosition,
    playerId,
    nodes,
    materials,
  };
};
