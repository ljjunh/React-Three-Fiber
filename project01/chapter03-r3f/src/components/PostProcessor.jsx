import {
  Bloom,
  BrightnessContrast,
  DotScreen,
  EffectComposer,
  Glitch,
  Grid,
  HueSaturation,
  Pixelation,
  Sepia,
} from "@react-three/postprocessing";
export const PostProcessor = () => {
  return (
    <EffectComposer disableNormalPass>
      {/* <Bloom
        intensity={0.5}
        mipmapBlur
        luminanceThreshold={1}
        luminanceSmoothing={0.02}
      /> */}
      {/* <BrightnessContrast brightness={-0.2} contrast={0.8} /> */}
      {/* <DotScreen angle={Math.PI / 6} scale={1} /> */}
      {/* <Glitch
        delay={[1.5, 3.5]}
        duration={(0.5, 1.0)}
        strength={[0.01, 1.0]}
        ratio={0.5}
      /> */}
      {/* <Grid scale={1} lineWidth={0.1} /> */}
      {/* <HueSaturation hue={Math.PI / 2} saturation={0.4} /> */}
      {/* <Pixelation granularity={10} /> */}
      <Sepia intensity={0.5} />
    </EffectComposer>
  );
};
