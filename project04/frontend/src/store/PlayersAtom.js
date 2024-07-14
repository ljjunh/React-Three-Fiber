import { atom } from "recoil";

// 유저 정보 저장
export const MeAtom = atom({
  key: "MeAtom",
  default: undefined,
});

// 캐릭터를 선택했는지 안했는지
export const CharacterSelectFinishedAtom = atom({
  key: "CharacterSelectFinishedAtom",
  default: false,
});

// 3개의 캐릭터를 선택하도록 할건데,glb파일을 배열에 넣고 어떤 캐릭터를 골랐는지 기억하기위해
export const SelectedCharacterGlbNameIndexAtom = atom({
  key: "SelectedCharacterGlbNameIndexAtom",
  default: 0,
});

export const PlayersAtom = atom({
  key: "PlayersAtom",
  default: [],
});
