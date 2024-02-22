import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// renderer.setSize( window.innerWidth, window.innerHeight );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 1000 / 1000, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

renderer.setSize(1000, 1000);

const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 100);
controls.update();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00d8ff,
});
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const points = [];
points.push(new THREE.Vector3(-2, 0.5, 0));
points.push(new THREE.Vector3(0, 2.5, 0));
points.push(new THREE.Vector3(2, 0.5, 0));
points.push(new THREE.Vector3(-2, 0.5, 0));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(lineGeometry, lineMaterial);
const cube = new THREE.Mesh(geometry, material);
const light = new THREE.AmbientLight(0xffffff);
// scene.add(cube);
scene.add(light);
// scene.add(line);

const loader = new GLTFLoader();
loader.load(
  "models/scene.gltf",
  function (gltf) {
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.rotation.set(0, -1.5, 0);
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

scene.background = new THREE.Color(0x242424);
camera.position.set(0, 0, 3);

document.body.appendChild(renderer.domElement);

// const maxFPS = 60;
// const frameDelay = 1000 / maxFPS;
// let lastFrameTime = 0;

function animate() {
  // const elapsed = currentTime - lastFrameTime;
  // if (elapsed > frameDelay) {
  //   renderer.render(scene, camera);
  //   lastFrameTime = currentTime - (elapsed % frameDelay);
  // }
  raycaster.setFromCamera(pointer, camera);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // cube.scale.x += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

animate();

function onScrollMove(event: WheelEvent) {
  console.log(event.deltaY);
  // if (event.deltaY > 0) camera.position.z += 0.1;
  // else camera.position.z -= 0.1;
  // pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  // pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // console.log(pointer);
}

function onDragMove(event: any) {
  // camera.lookAt(0, 0, 0);
  // camera.position.x -= event.movementX / 100;
  // camera.position.y += event.movementY / 100;
  console.log(event.clientX);
  console.log(event.clientY);
}

function mouseDownListener() {
  console.log("mouse down");
  window.addEventListener("mousemove", onDragMove, true);
}

function mouseUpListener() {
  console.log("mouse up");
  window.removeEventListener("mousemove", onDragMove, true);
}

document.querySelectorAll("canvas")[0].addEventListener("wheel", onScrollMove);
document
  .querySelectorAll("canvas")[0]
  .addEventListener("mousedown", mouseDownListener);
document
  .querySelectorAll("canvas")[0]
  .addEventListener("mouseup", mouseUpListener);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
