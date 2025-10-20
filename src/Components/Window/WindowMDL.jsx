import { useGLTF } from '@react-three/drei'
import WindowManager from './WindowManager'
import { Suspense, useRef } from 'react'
import { useStore } from '../../Store/useStore'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'



const WindowMDL = () => {
  const { setWeather, setCityName, Weather } = useStore((state) => state)

  const { scene, nodes } = useGLTF('/Models/roomc.glb')
  const clonedScene = scene.clone(true)

  // Glass 
  const glass = clonedScene.getObjectByName('Glass')
  if (glass && glass.parent) glass.parent.remove(glass)

  // Weathers
  const clickableNames = ['Sunny', 'Stormy', 'Rainy', 'Cloudy', 'Snowy']

  const handleClick = (e) => {
    e.stopPropagation()
    const name = e.object.userData.name

    if (clickableNames.includes(name)) {
      console.log(`🌟 Clicked on: ${name}`)
      e.object.rotation.z += 0.1
      setWeather(name)
      setCityName(null)
    }
  }

  const basey = clonedScene.getObjectByName(Weather).position.y
  useFrame((state) => {
    if (Weather) {
      const t = state.clock.elapsedTime
      clonedScene.getObjectByName(Weather).position.y = basey + 0.7 + Math.sin(t * 2.5) * 0.3

    }
  })


  // Apply emissive color based on each object's original color
  clickableNames.forEach((name) => {
    const obj = clonedScene.getObjectByName(name)
    if (obj && obj.material) {
    const baseColor = obj.material.emissive?.clone?.() || obj.material.color?.clone?.() || new THREE.Color(0xffffff)
    obj.material.emissive = baseColor
    obj.material.emissiveIntensity = 2
    }
  })

  return (
    <Suspense fallback={null}>
      <group receiveShadow scale={0.4} position={[2.5, -1.7, 0]} rotation={[0, Math.PI / 2, 0]}
        onClick={handleClick}
      >
    
        <primitive object={clonedScene} />
        <mesh geometry={nodes.Glass.geometry} scale={1} position={[0, 1, -5]} >
          <WindowManager />
        </mesh>
      </group>
    </Suspense>
  )
}

export default WindowMDL
