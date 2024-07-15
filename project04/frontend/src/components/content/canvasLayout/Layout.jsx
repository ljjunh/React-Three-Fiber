import { useRecoilValue } from "recoil";
import { IsLoadCompletedAtom } from "../../../store/PlayersAtom";
import styled from "@emotion/styled";
import { SideBar } from "./canvasUserInterfaces/common/SideBar";
import { Minimap } from "./canvasUserInterfaces/ground/Minimap";
export const CanvasLayout = ({ children }) => {
  const isLoadCompleted = useRecoilValue(IsLoadCompletedAtom);
  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <SideBar />
          <Minimap />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;
