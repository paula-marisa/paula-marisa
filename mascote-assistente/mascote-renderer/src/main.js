import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MascoteStateManager, estadosMascote } from './mascoteState.js';

const scene = new THREE.Scene();

const canvas = document.getElementById('mascoteCanvas');
const aspectRatio = canvas.clientWidth / canvas.clientHeight;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Luzes
scene.add(new THREE.AmbientLight(0xffffff, 3));
const directionalLight = new THREE.DirectionalLight(0xfff4e6, 2);
directionalLight.position.set(2, 2, 4);
scene.add(directionalLight);
const fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(-2, -1, 3);
scene.add(fillLight);

const loader = new GLTFLoader();
let modeloAtual = null;
let estadoAtual = 'base';

// Função para trocar de modelo da mascote
function trocarMascote(estado) {
  if (estado === estadoAtual) return;
  estadoAtual = estado;

  const ficheiro = estadosMascote[estado] || estadosMascote.base;

  loader.load(`mascote/${ficheiro}`, (gltf) => {
    if (modeloAtual) scene.remove(modeloAtual);

    modeloAtual = gltf.scene;
    modeloAtual.scale.set(1.2, 1.2, 1.2);
    modeloAtual.position.set(0, -0.3, 0);
    modeloAtual.rotation.y = -Math.PI / 2;

    scene.add(modeloAtual);
  }, undefined, (error) => {
    console.error('Erro ao carregar modelo:', error);
  });
}

// Estado inicial
trocarMascote('base');

// Integração com estado de atividade (parado/ativo)
const stateManager = new MascoteStateManager(
  () => trocarMascote('escrever'), // Ativo
  () => trocarMascote('inativo')   // Inativo
);

// Integração com estado enviado pelo processo principal
window.electronAPI?.onEstadoMascote?.((estado) => {
  trocarMascote(estado);
});

// Animação
function animate() {
  requestAnimationFrame(animate);
  if (modeloAtual && renderer) {
    modeloAtual.rotation.y += 0.003;
    renderer.render(scene, camera);
  }
}
animate();

// Drag manual
const dragWrapper = document.getElementById('drag-wrapper');
let isDragging = false;
let offsetX, offsetY;

dragWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - dragWrapper.offsetLeft;
  offsetY = e.clientY - dragWrapper.offsetTop;
});

window.addEventListener('mousemove', (e) => {
  if (isDragging) {
    dragWrapper.style.left = `${e.clientX - offsetX}px`;
    dragWrapper.style.top = `${e.clientY - offsetY}px`;
    dragWrapper.style.bottom = 'auto';
    dragWrapper.style.right = 'auto';
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

dragWrapper.addEventListener('mouseenter', () => {
  window.electronAPI?.mouseOver();
});

dragWrapper.addEventListener('mouseleave', () => {
  window.electronAPI?.mouseLeave();
});
