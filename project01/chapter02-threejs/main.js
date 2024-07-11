import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

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
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
// scene.add(directionalLightHelper);

const gltfLoader = new GLTFLoader();
// gltfLoader.load("/dancer.glb", (gltf) => {
//   const character = gltf.scene;
//   character.position.y = 0.8;
//   character.scale.set(0.01, 0.01, 0.01);
//   scene.add(gltf.scene);
// });

const gltf = await gltfLoader.loadAsync("/dancer.glb");
console.log(gltf);
const character = gltf.scene;
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

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true; // 감쇠 효과 활성화
orbitControls.dampingFactor = 0.03; // 감쇠 효과 강도 설정. 값이 클수록 움직임이 빨리 멈춤. 낮아야 부드러움

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 업데이트 적용
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();
};
render();
