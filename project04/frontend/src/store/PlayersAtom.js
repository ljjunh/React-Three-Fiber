import { atom, selector } from "recoil";

// 모든 플레이어들
export const PlayersAtom = atom({
  key: "PlayersAtom",
  default: [],
});

// 내 socket 정보
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

export const PlayerCompletedQuestAtom = atom({
  key: "PlayerCompletedQuestAtom",
  default: [],
});

export const PlayerInventoryAtom = atom({
  key: "PlayerInventoryAtom",
  default: [],
});

export const PlayGroundStructuresBoundingBoxAtom = atom({
  key: "PlayGroundStructuresBoundingBoxAtom",
  default: [],
});

export const PlayerGroundStructuresFloorPlaneCornersSelector = selector({
  key: "PlayerGroundStructuresFloorPlaneCornersSelector",
  get: ({ get }) => {
    const pb = get(PlayGroundStructuresBoundingBoxAtom);
    return pb.map((item) => {
      return {
        name: item.name,
        corners: [
          {
            x: item.box.max.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
          {
            x: item.box.max.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
        ],
        position: item.position,
      };
    });
  },
});

export const IsLoadCompletedAtom = atom({
  key: "IsLoadCompletedAtom",
  default: false,
});

export const CurrentMapAtom = atom({
  key: "CurrentMapAtom",
  default: "GROUND",
});

export const CurrentMyRoomPlayerAtom = atom({
  key: "CurrentMyRoomPlayerAtom",
  default: undefined,
});
