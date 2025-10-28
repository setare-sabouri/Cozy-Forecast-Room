import { useGLTF } from '@react-three/drei'
import WindowManager from './WindowManager'
import { Suspense, useRef, useState } from 'react'
import { useStore } from '../../Store/useStore'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import PlaceHolder from '../../Utils/PlaceHolder/PlaceHolder'

const WindowMDL = () => {
  const { setWeather, setCityName, Weather } = useStore((state) => state)
  const { scene, nodes } = useGLTF('/Models/room.glb')
  const clonedScene = scene.clone(true)

  // Glass
  const glass = clonedScene.getObjectByName('Glass')
  if (glass?.parent) glass.parent.remove(glass)

  // weathers 
  const clickableNames = ['Sunny', 'Stormy', 'Rainy', 'Cloudy', 'Snowy']

  // Stars
  const starNames = ['star1', 'star2', 'star3']
  const starStates = useRef({
    star1: false,
    star2: false,
    star3: false,
  })

  // Handle clicks
  const handleClick = (e) => {
    e.stopPropagation()
    const name = e.object.userData.name

    // Stars
    if (starNames.includes(name)) {
      const star = clonedScene.getObjectByName(name)
      if (star && star.material) {
        starStates.current[name] = !starStates.current[name]
        star.material.emissiveIntensity = starStates.current[name] ? 2 : 0.2
      }
      return
    }

    // weathers 
    if (clickableNames.includes(name)) {
      console.log(`🌟 Clicked on: ${name}`)
      e.object.rotation.z += 0.1
      setWeather(name)
      setCityName(null)
    }

  }

  // Animate Weather
  const baseY = clonedScene.getObjectByName(Weather)?.position.y || 0
  useFrame((state) => {
    if (Weather) {
      const t = state.clock.elapsedTime
      const weatherObj = clonedScene.getObjectByName(Weather)
      if (weatherObj) {
        weatherObj.position.y = baseY + 0.7 + Math.sin(t * 2.5) * 0.3
      }
    }
  })

  //  stars
  starNames.forEach((name) => {
    const star = clonedScene.getObjectByName(name)
    if (star?.material) {
      star.material.emissive = new THREE.Color(0xffffcc)
      star.material.emissiveIntensity = 2
    }
  })

  return (
    <Suspense fallback={<PlaceHolder/>}>
      <group
        scale={0.4}
        position={[2.5, -1.7, 0]}
        rotation={[0, Math.PI / 2, 0]}
        onClick={handleClick}
      >
        <primitive object={clonedScene} />
        <mesh geometry={nodes.Glass.geometry} scale={1} position={[0, 1, -5]}>
          <WindowManager />
        </mesh>
      </group>
    </Suspense>
  )
}

export default WindowMDL

useGLTF.preload('/Models/room.glb')