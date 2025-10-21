import { Environment, OrbitControls, PresentationControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

import WindowMDL from './Window/WindowMDL'
import BasicPipeLine from '../BasicPipeLine/BasicPipeline'
import VolumetricEffect from './Fire/Fire'
import * as THREE from 'three'


const Experience = () => {
  return (
    <Canvas shadows camera={{ position: [-0.5, 7, 33], fov: 30, rotation: [-Math.PI / 15, 0, 0] }}>
      <PresentationControls polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 2, Math.PI / 2]} snap speed={0.5}>
        {/* <WindowMDL /> */}

        {/* Fire  */}
        <VolumetricEffect color={new THREE.Color(0xf5f5f5)} texturePath="/Textures/fire.png" position={[8.8, -2.9, 2]} scale={[2, 2, 2]} magnitude={3} speed={1}  opacity={0.5} />
         {/* Tea Steam */}
        <VolumetricEffect color={new THREE.Color('#969292')} texturePath="/Textures/steam.jpg" position={[-2.4, 1.8, 1.7]} scale={[1, 4, 1]} magnitude={3} speed={0.5}  opacity={0.15} />
        
      </PresentationControls>
      {/* <OrbitControls/> */}
      <Perf position="top-left" />
      <color attach="background" args={['#47271b']} />  
      <ambientLight intensity={0.1} />
      {/* <Environment preset='city' /> */}
      <directionalLight position={[0, 6, 14]} intensity={1} castShadow />
      <BasicPipeLine />
    </Canvas>

  )
}

export default Experience


