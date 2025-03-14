"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text3D } from "@react-three/drei";
import { Vector3 } from "three";

// 🚀 Função para carregar o modelo da floresta
const Forest = () => {
    const { scene } = useGLTF("/models/low-poly-forest/scene.gltf", true); 
    return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
};

// 🚀 Função para exibir o nome em 3D na posição azul
const Name3D = () => {
  return (
    <Text3D
      font="/fonts/helvetiker_regular.typeface.json"
      size={1}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.1}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
      position={[-4, 0.5, -8]} // Posição azul
    >
      Paula Rodrigues
      <meshStandardMaterial attach="material" color="black" />
    </Text3D>
  );
};

// 🚀 Função para carregar o modelo do robô e permitir movimento
const Robot = () => {
  const { scene } = useGLTF("/models/robot/RobotExpressive.glb");
  const robotRef = useRef<any>();
  const speed = 0.1;
  const movement = useRef({ forward: false, backward: false, left: false, right: false });
  const initialPosition = [-6, 0, 3]; // Posição vermelha

  useEffect(() => {
    if (robotRef.current) {
      robotRef.current.position.set(...initialPosition);
    }
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          movement.current.forward = true;
          break;
        case "ArrowDown":
        case "s":
          movement.current.backward = true;
          break;
        case "ArrowLeft":
        case "a":
          movement.current.left = true;
          break;
        case "ArrowRight":
        case "d":
          movement.current.right = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          movement.current.forward = false;
          break;
        case "ArrowDown":
        case "s":
          movement.current.backward = false;
          break;
        case "ArrowLeft":
        case "a":
          movement.current.left = false;
          break;
        case "ArrowRight":
        case "d":
          movement.current.right = false;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (robotRef.current) {
      const direction = new Vector3();
      if (movement.current.forward) direction.z -= speed;
      if (movement.current.backward) direction.z += speed;
      if (movement.current.left) direction.x -= speed;
      if (movement.current.right) direction.x += speed;
      robotRef.current.position.add(direction);
    }
  });

  return <primitive object={scene} ref={robotRef} position={initialPosition} scale={0.5} />;
};

const Game = () => {
  return (
    <div className="w-screen h-screen bg-blue-400 relative">
      <Canvas className="w-full h-full camera={{ position: [-6, 10, 3], fov: 50 }}">
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Forest />
        <Name3D />
        <Robot />
      </Canvas>
    </div>
  );
};

export default Game;
