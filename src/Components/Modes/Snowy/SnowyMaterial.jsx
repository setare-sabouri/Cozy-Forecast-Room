import { Environment, MeshPortalMaterial, useGLTF } from '@react-three/drei'
import Particles from '../Particles'

import SeasonalClouds from '../Clouds'
import { useStore } from '../../../Store/useStore'
import Lights from '../../Lights/Lights'
import { useEffect } from 'react'

const SnowyMaterial = () => {
  const { Weather } = useStore()
  const snow = useGLTF('/Models/snow_man.glb')


    // Dispose of the GLTF scene and its geometries/materials on unmount
  useEffect(() => {
    return () => {
      if (snow?.scene) {
        snow.scene.traverse((child) => {
          if (child.geometry) child.geometry.dispose()
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      }
    }
  }, [snow])

  return (
    <MeshPortalMaterial>
      <ambientLight intensity={0.5} />
      <directionalLight  position={[0, 10, 0]}  intensity={2} />
      <color attach="background" args={['#4d5151']} />
      <Particles count={500} mode={Weather} distanceToWindow={-0.5} />
      <SeasonalClouds position={[50, 14, 0]} bounds={[1, 10, 20]} color='#ffffff' />
      <group scale={1} position={[30, -24, 25]} rotation={[0, -Math.PI / 3, 0]} >
        <primitive object={snow.scene} />
      </group>
    </MeshPortalMaterial>
  )
}

export default SnowyMaterial

useGLTF.preload('/Models/snow_man.glb')


