import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Points({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef();
  const particles = 100;
  const positions = new Float32Array(particles * 3);

  for (let i = 0; i < particles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5; // x
    positions[i * 3 + 1] = Math.random() * 1.5;     // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // z
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: new THREE.Color("orange"),
    size: 0.15,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.3;
    group.current.children[0].material.color.setHSL(
      0.08 + Math.sin(t * 3) * 0.02,
      1,
      0.5
    );
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <points geometry={geometry} material={material} />
    </group>
  );
}



//  <Points position={[8, 0, 10]} scale={2} />
