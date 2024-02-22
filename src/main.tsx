import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as THREE from "three";

// renderer.setSize( window.innerWidth, window.innerHeight );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 1000 / 1000, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 1000);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00d8ff,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 3;
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

animate();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
