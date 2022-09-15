import React, { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';


import { atmosphereVertext, atmosphereFragment } from './shaders';

function Atmosphere(props) {
  return (
    <mesh dispose={null} {...props}>
      <sphereGeometry args={[0.5, 48, 48]} />
      <shaderMaterial
        vertexShader={atmosphereVertext}
        fragmentShader={atmosphereFragment}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Earth(props) {
  const earth = useRef(null);
  const colorMap = useLoader(TextureLoader, '/uv/earth/Earth.jpg');
  const bumMap = useLoader(TextureLoader, '/uv/earth/elev_bump_8k.jpg');
  const cloudMap = useLoader(TextureLoader, '/uv/earth/earthCloud.png');
  const specularMap = useLoader(TextureLoader, '/uv/earth/water_8k.png');
  const emissiveMap = useLoader(TextureLoader, '/uv/earth/emissive.jpeg');

  useFrame(() => {
    earth.current.rotation.y += 0.002;
  });

  return (
    <group ref={earth}>
      <mesh {...props}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhongMaterial
          map={colorMap}
          bumpMap={bumMap}
          specularMap={specularMap}
          specular="grey"
          bumpScale={0.008}
          emissiveMap={emissiveMap}
          emissive="black"
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.03, 48, 48]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function EarthTexture() {
  return (
    <Canvas
      camera={{ fov: 30, near: 0.1, far: 500 }}
      style={{
        width: '50vw',
        height: '50vw',
      }}
    >
      <Suspense fallback={null}>
        <directionalLight color="#fff" intensity={0.7} position={[-2, 2, 0]} />
        <ambientLight color="#3a7dae" intensity={0.7} />
        <Earth />
        <Atmosphere />
      </Suspense>
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
}
