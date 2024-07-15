import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useRecoilState } from "recoil";
import { Vector3 } from "three";
import { PlayerInventoryAtom } from "../../../../../../../store/PlayersAtom";
import { uniq } from "lodash-es";

const name = "ground-steak";

export const Steak = () => {
  const ref = useRef(null);

  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const { scene } = useGLTF("/models/Steak.glb");

  const position = useMemo(() => new Vector3(-8, 0, -2), []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);

  return (
    <primitive
      onClick={(e) => {
        e.stopPropagation();
        alert("고기를 주웠습니다!");
        setPlayerInventory((prev) => uniq([...prev, "food"]));
        if (ref.current) {
          ref.current.visible = false;
        }
      }}
      ref={ref}
      visible
      name={name}
      position={position}
      object={scene}
    />
  );
};
