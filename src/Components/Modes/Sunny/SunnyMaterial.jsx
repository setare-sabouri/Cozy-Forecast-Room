import { Environment, MeshPortalMaterial, Sphere, useAnimations, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react';
import * as THREE from 'three';

const SunnyMaterial = () => {

  // Sun
  const SunTex = useLoader(THREE.TextureLoader, '/Textures/Sunny/SunTe.jpg')
  SunTex.rotation = Math.PI / 2;
  const SunMaterial = new THREE.MeshBasicMaterial({ map: SunTex });

  // Birds
  const Birds = useGLTF('/Models/bird.glb')
  const { actions,names } = useAnimations(Birds.animations,Birds.scene)

  useEffect(() => {
    if (actions && names.length > 0) {
      const action = actions[names[0]]
      action.play()
    }
  }, [actions, names])

  return (
    <MeshPortalMaterial>
      <color attach="background" args={['#5e9292']} />
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Sphere args={[1, 32, 32]} material={SunMaterial} position={[5, 8, 4]} />
      <group scale={7} position={[6, 7, -5]}>
        <primitive object={Birds.scene} />
      </group>
    </MeshPortalMaterial>
  )
}

export default SunnyMaterial
