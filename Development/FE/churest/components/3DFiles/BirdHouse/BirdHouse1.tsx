/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 BirdHouse1.glb -t
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { glbs } from '@/public/assets/glb';

type GLTFResult = GLTF & {
  nodes: {
    큐브044: THREE.Mesh;
    큐브044_1: THREE.Mesh;
    큐브044_2: THREE.Mesh;
    큐브044_3: THREE.Mesh;
  };
  materials: {
    ['매테리얼.011']: THREE.MeshStandardMaterial;
    ['매테리얼.012']: THREE.MeshStandardMaterial;
    ['매테리얼.005']: THREE.MeshStandardMaterial;
    ['매테리얼.016']: THREE.MeshStandardMaterial;
  };
};

export function BirdHouse1(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(glbs.birdhouse_1_glb) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={0.5}>
      <group position={[0.03, 0.88, -0.08]} scale={[0.12, 0.91, 0.09]}>
        <mesh
          geometry={nodes.큐브044.geometry}
          material={materials['매테리얼.011']}
          castShadow
        />
        <mesh
          geometry={nodes.큐브044_1.geometry}
          material={materials['매테리얼.012']}
          castShadow
        />
        <mesh
          geometry={nodes.큐브044_2.geometry}
          material={materials['매테리얼.005']}
          castShadow
        />
        <mesh
          geometry={nodes.큐브044_3.geometry}
          material={materials['매테리얼.016']}
          castShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload(glbs.birdhouse_1_glb);
