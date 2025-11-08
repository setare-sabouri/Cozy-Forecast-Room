import { OrbitControls, PresentationControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

import WindowMDL from './Window/WindowMDL'
import BasicPipeLine from '../BasicPipeLine/BasicPipeline'
import VolumetricEffect from './Fire/Fire'
import * as THREE from 'three'
import useBreakpoint from '../Utils/useBreakpoint'
import { useStore } from '../Store/useStore'
import Lights from './Lights/Lights'
import { Suspense } from 'react'
import Dog from './Dog/Dog'
import Sofa from './Sofa/Sofa'



const Experience = () => {
  const breakpoint = useBreakpoint()
  const { Weather } = useStore()

  return (
    <Canvas  camera={{ position: breakpoint === 'desktop' ? [-0.5, 7.4, 34] : [-0.5, 8, 37], fov: 30, rotation: [-Math.PI / 15, 0, 0] }}>
      <PresentationControls polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 2, Math.PI / 2]} snap speed={0.5}>
       <Suspense fallback={null}>
         <WindowMDL />
        {Weather !== 'Sunny' && <VolumetricEffect color={new THREE.Color(0xf5f5f5)} texturePath="/Textures/fire.png" position={[8.8, -0.6, 2]} scale={[2, 2, 2]} magnitude={2} speed={1} opacity={0.5} />}
        <VolumetricEffect color={new THREE.Color('#969292')} texturePath="/Textures/steam.jpg" position={[-2.4, 1.8, 1.7]} scale={[1, 4, 1]} magnitude={4} speed={0.2} opacity={0.15} />
        <Dog/>
        <Sofa/>
        </Suspense>
      </PresentationControls>
      <Lights/>
      {/* <OrbitControls/> */}
      {/* <Perf position="top-left" /> */}
      <color attach="background" args={['#25140e']} />
      <ambientLight intensity={1} color={'#ffffff'} />
      <BasicPipeLine />
    </Canvas>

  )
}

export default Experience




// x jolo aghab 
// y bala paein