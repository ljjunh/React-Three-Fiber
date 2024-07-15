import { Cloud, Clouds } from "@react-three/drei";
import { Floor } from "./elements/Floor";
import { JungleGym } from "./elements/JungleGym";
import { Key } from "./elements/Key";
import { Dinosaur } from "./elements/npc/Dinosaur";
import { ShibaInu } from "./elements/npc/ShibaInu";
import { Zombie } from "./elements/npc/Zombie";
import { PineTrees } from "./elements/PineTrees";
import { Steak } from "./elements/Steak";
import { Swing } from "./elements/Swing";
import { Tree } from "./elements/Tree";
import { WoodChest } from "./elements/WoodChest";

export const GroundElements = () => {
  return (
    <>
      <Floor />

      <Dinosaur />
      <Zombie />
      <ShibaInu />

      <Tree position={[-9, 0, -8]} />
      <Tree position={[10, 0, -10]} />
      <Tree position={[-3, 0, 20]} />
      <Tree position={[-8, 0, 22]} />

      <PineTrees position={[-30, 0, -30]} />
      <PineTrees position={[-20, 0, -30]} />
      <PineTrees position={[-30, 0, -20]} />
      <PineTrees position={[-20, 0, -20]} />

      <Key />
      <Steak />
      <WoodChest />

      <Swing />
      <JungleGym />

      <Clouds>
        <Cloud
          segments={100}
          volume={5}
          scale={2}
          concentrate="random"
          opacity={0.5}
          speed={2}
          position={[-20, 0, -20]}
        />
        <Cloud
          segments={10}
          volume={10}
          scale={2}
          concentrate="random"
          opacity={0.5}
          fade={10}
          speed={2}
          position={[20, 0, -20]}
          color={"skyblue"}
        />
      </Clouds>
    </>
  );
};
