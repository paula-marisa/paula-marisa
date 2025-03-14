"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";

const Name3D = () => {
  return (
    <Canvas className="h-screen bg-black">
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} />
      <OrbitControls />
      <Text3D
        font="/fonts/Ponomar_Regular.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.1}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2, 0, 0]}
      >
        Paula Rodrigues
        <meshStandardMaterial attach="material" color="white" />
      </Text3D>
    </Canvas>
  );
};

export default Name3D;
