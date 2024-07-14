import { useRecoilValue } from "recoil";
import { CharacterSelectFinishedAtom, MeAtom } from "../../store/PlayersAtom";
import { MainCanvas } from "./canvas/MainCanvas";
import { CanvasLayout } from "./canvasLayout/Layout";
import { Lobby } from "./lobby/Lobby";
export const Content = () => {
  const characterSelectedFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const me = useRecoilValue(MeAtom);

  if (characterSelectedFinished && me) {
    return (
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    );
  }
  return <Lobby />;
};
