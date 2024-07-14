import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as THREE from "three";
import {
  CharacterSelectFinishedAtom,
  PlayersAtom,
} from "../../../../store/PlayersAtom";
import { CharacterInit } from "../../lobby/CharacterInit";
import { Player } from "./player/Player";
import { GroundElements } from "./structures/ground";
export const RootMap = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const [players] = useRecoilState(PlayersAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);
  console.log("이거이거", players);
  useEffect(() => {
    if (!controls.current) return;
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
  }, [camera.position]);

  return (
    <>
      {!characterSelectFinished ? (
        <CharacterInit />
      ) : (
        <>
          <GroundElements />
          {players.map((player) => {
            return (
              <Player
                key={player.id}
                player={player}
                position={
                  new THREE.Vector3(
                    player.position[0],
                    player.position[1],
                    player.position[2]
                  )
                }
              />
            );
          })}
        </>
      )}
    </>
  );
};
