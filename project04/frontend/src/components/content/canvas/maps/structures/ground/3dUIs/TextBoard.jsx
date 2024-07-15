import { Billboard, Text } from "@react-three/drei";
import { forwardRef } from "react";

export const TextBoard = forwardRef(({ text, isNpc }, ref) => {
  return (
    <Billboard ref={ref}>
      <Text
        font={"/NotoSansKR-Regular.ttf"}
        fontSize={isNpc ? 0.4 : 0.25}
        color={isNpc ? 0xff71c2 : 0x000000}
      >
        {text}
      </Text>
    </Billboard>
  );
});
