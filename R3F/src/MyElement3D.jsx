import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"; // import 하고 THREE.MathUtils.degToRad()하면 각도 * Math.PI / 180이랑 같은 결과
// mesh : 렌더링 할 3차원 모델
// Three.js는 라디안 단위 사용
// 45도를 라디안으로 변경하려면 : 각도*파이/180
//
const MyElement3D = () => {
  const refMesh = useRef();
  // useFrame : 매 프레임이 렌더링되기 전에 호출되는 콜백함수를 정의하는 훅
  //   useFrame((state, delta) => {
  //     //콜백함수는 매프레임이 렌더링 되기 전에 호출
  //     //delta:이전 프레임과 현재 프레임사이의 경과시간(ms단위)
  //     refMesh.current.rotation.y += delta;
  //     //ref로 참조한 mesh의 y축 회전에 delta(이전 프레임과 현재 프레임 시간 간격 대략 0.016라디안)을 더하면
  //     // 초기회전 : 45도 = 0.785398 라디안
  //     // 매 프레임마다 0.785398 + 0.016(대략적인 값)
  //     // 다음 프레임 : 0.801398 + 0.016
  //     //.. 계속 누적
  //     // degree로 환산하면 0.016라디안 = 0.916732도 즉, 매 프레임마다 약 0.92도씩 회전 증가
  //   });

  useFrame((state, delta) => {
    refMesh.current.rotation.z += delta;
  });
  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <axesHelper scale={10} />{" "}
      {/*3차원 축을 화면에 표시, 축의 크기 키우기 위해 sacle={10}추가 */}
      <OrbitControls />
      <mesh
        ref={refMesh}
        position-y={2}
        rotation-z={THREE.MathUtils.degToRad(45)}
        scale={[2, 1, 1]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#e67e22"
          opacity={0.5}
          transparent={true}
        />
        <axesHelper />
        <mesh scale={[0.1, 0.1, 0.1]} position-y={2}>
          <sphereGeometry />
          <meshStandardMaterial color="red" />
          <axesHelper scale={5} />
        </mesh>
      </mesh>
    </>
  );
};

export default MyElement3D;
