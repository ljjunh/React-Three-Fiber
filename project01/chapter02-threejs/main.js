import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { mix } from "three/examples/jsm/nodes/Nodes.js";

const renderer = new THREE.WebGLRenderer({ antialias: true }); // 박스매쉬 등 끝부분 울렁이는현상 완화
renderer.shadowMap.enabled = true; // 렌더러에서 그림자 맵 활성화
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기를 화면과 똑같이 만들어줌
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, //fov
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

const floorGeomerty = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
});
const floor = new THREE.Mesh(floorGeomerty, floorMaterial);
floor.rotation.x = -Math.PI / 2; // PI를 180도라 생각하고 /2 하면 -90도 회전
floor.receiveShadow = true; // 다른 객체들의 그림자를 받을 수 있게
floor.castShadow = true; // 객체 자체가 그림자를 생성할 수 있도록
floor.name = "FLOOR";
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.y = 0.5;
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
// scene.add(boxMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 조명색, 강도
directionalLight.castShadow = true; // 그림자 생성할 수 있음
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0); // 조명이 바라보는 방향
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.top = 0.5;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);

const gltfLoader = new GLTFLoader();

const gltf = await gltfLoader.loadAsync("/dancer.glb");
console.log(gltf);
const character = gltf.scene;
const animationClips = gltf.animations;
character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
character.castShadow = true;
character.receiveShadow = true;
// 모든 객체에 그림자를 줘야 하는데 칠드런을 타고내려가서 속성값을 변경할 수 있게 해주는 메서드
character.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});

scene.add(gltf.scene);

const mixer = new THREE.AnimationMixer(character);
const action = mixer.clipAction(animationClips[3]); // 저장된 애니메이션 인덱스3번을 가져와서
// action.setLoop(THREE.LoopOnce); // 애니메이션 한번만 실행하고 정지
// action.setLoop(THREE.LoopRepeat); // 애니메이션 계속 반복
action.setLoop(THREE.LoopPingPong);
// action.setDuration(10);//애니메이션 총 재생에 걸리는 시간 설정
// action.setEffectiveTimeScale(1); // 재생 배속
// action.setEffectiveWeight(1); // 액션의 분명함 정도 ex).춤추는 애니메이션 : 수치 낮을수록 춤 대충 춤
action.play(); // 실행

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true; // 감쇠 효과 활성화
orbitControls.dampingFactor = 0.03; // 감쇠 효과 강도 설정. 값이 클수록 움직임이 빨리 멈춤. 낮아야 부드러움

const newPosition = new THREE.Vector3(0, 1, 0);
//3js에서의 좌표는 -1,1 우측하단 1,-1 정중앙이 0,0
const rayCaster = new THREE.Raycaster();
renderer.domElement.addEventListener("pointerdown", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -((e.clientY / window.innerHeight) * 2 - 1);
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  // rayCaster로 특정한 물체를 관통할건데 그 후보를 scene에 있는 children으로 한정해서 해보겠다
  console.log("intersects", intersects);

  const intersectFloor = intersects.find((i) => i.object.name === "FLOOR");
  console.log("intersectFloor", intersectFloor);
  newPosition.copy(intersectFloor.point);
  newPosition.y = 1;
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 업데이트 적용
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();

const render = () => {
  character.lookAt(newPosition);
  targetVector
    .subVectors(newPosition, character.position)
    .normalize()
    .multiplyScalar(0.01);

  if (
    Math.abs(character.position.x - newPosition.x) >= 1 ||
    Math.abs(character.position.z - newPosition.z) > 1
  ) {
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
};
render();
