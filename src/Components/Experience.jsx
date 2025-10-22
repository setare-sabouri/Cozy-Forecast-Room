import { OrbitControls, PresentationControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

import WindowMDL from './Window/WindowMDL'
import BasicPipeLine from '../BasicPipeLine/BasicPipeline'
import VolumetricEffect from './Fire/Fire'
import * as THREE from 'three'
import useBreakpoint from '../Utils/useBreakpoint'
import { useStore } from '../Store/useStore'


const Experience = () => {
  const breakpoint = useBreakpoint()
  const { Weather } = useStore()

  return (
    <Canvas shadows camera={{ position: breakpoint === 'desktop' ? [-0.5, 7.4, 34] : [-0.5, 8, 37], fov: 30, rotation: [-Math.PI / 15, 0, 0] }}>
      <PresentationControls polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 2, Math.PI / 2]} snap speed={0.5}>

        <WindowMDL />

        {/* Fire  */}
        {Weather!=='Sunny' &&
          <VolumetricEffect color={new THREE.Color(0xf5f5f5)} texturePath="/Textures/fire.png" position={[8.8, -0.6, 2]} scale={[2, 2, 2]} magnitude={2} speed={1} opacity={0.5} />
        }         {/* Tea Steam */}
        <VolumetricEffect color={new THREE.Color('#969292')} texturePath="/Textures/steam.jpg" position={[-2.4, 1.8, 1.7]} scale={[1, 4, 1]} magnitude={3} speed={0.5} opacity={0.15} />

      </PresentationControls>
      {/* <OrbitControls/> */}
      {/* <Perf position="top-left" /> */}
      <color attach="background" args={['#47271b']} />
      <ambientLight intensity={0.1} />

      <directionalLight position={[0, 6, 14]} intensity={2} castShadow />

      <BasicPipeLine />
    </Canvas>

  )
}

export default Experience


