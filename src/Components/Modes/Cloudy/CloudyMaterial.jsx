import React from 'react'
import {Environment, MeshPortalMaterial, Sphere, Stars } from '@react-three/drei'
import SeasonalClouds from '../Clouds';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const CloudyMaterial = () => {

  const MoonTex = useLoader(THREE.TextureLoader, '/Textures/Cloudy/MoonTex.jpg')
  MoonTex.center.set(0.5,0.5);
  MoonTex.rotation = Math.PI / 4; 
 

  const MoonMaterial = new THREE.MeshBasicMaterial({ map: MoonTex });

  return (

    <MeshPortalMaterial>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.6}  />
      <Environment preset="city" />
      <Stars/>
      <group >
        <SeasonalClouds position={[100, 5, 0]} bounds={[50, 4, 30]} color='#949c9b' />
        <Sphere args={[1.5, 32, 32]} material={MoonMaterial} position={[90, -4, -10]}  rotation={[Math.PI, Math.PI/2, 0]} />
      </group>
    </MeshPortalMaterial>

  )
}

export default CloudyMaterial

// add fire maybe 