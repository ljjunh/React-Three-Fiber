import { useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useEffect } from "react";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import { Loader } from "./Loader";
export const Dancer = () => {
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");
  const isEntered = useRecoilValue(IsEnteredAtom);

  const { actions } = useAnimations(animations, dancerRef);
  const scroll = useScroll();

  useEffect(() => {
    if (!isEntered) return;
    actions["wave"].play();
  }, [actions, isEntered]);
  if (isEntered) {
    return (
      <>
        <ambientLight intensity={2} />
        <primitive ref={dancerRef} object={scene} scale={0.05} />
      </>
    );
  }
  return <Loader isCompleted />;
};
