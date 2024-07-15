import { Html, useProgress } from "@react-three/drei";
import { useSetRecoilState } from "recoil";
import { IsLoadCompletedAtom } from "../../../store/PlayersAtom";
import { useEffect } from "react";

export const Loader = () => {
  const { progress } = useProgress();
  const SetIsLoadCompleted = useSetRecoilState(IsLoadCompletedAtom);

  useEffect(() => {
    SetIsLoadCompleted(progress === 100);
  }, [progress, SetIsLoadCompleted]);

  return (
    <Html center>
      <progress value={progress} />
    </Html>
  );
};
