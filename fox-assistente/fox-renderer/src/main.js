import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz básica
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Carregar o modelo GLTF
const loader = new GLTFLoader();
loader.load(
  '/fox_in_a_cape/scene.gltf',
  (gltf) => {
    const fox = gltf.scene;
    fox.scale.set(0.5, 0.5, 0.5);
    fox.position.set(0, -1, 0);
    fox.rotation.y = Math.PI;
    scene.add(fox);

    animate(fox);
  },
  undefined,
  (error) => {
    console.error('Erro ao carregar a Fox:', error);
  }
);

function animate(model) {
  requestAnimationFrame(() => animate(model));
  model.rotation.y += 0.005;
  renderer.render(scene, camera);
}
