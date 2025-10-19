import { Environment, PresentationControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

import WindowMDL from './Window/WindowMDL'


const Experience = () => {
  return (
    <Canvas shadows camera={{ position: [-0.5, 7, 33], fov: 30,rotation:[-Math.PI/15,0,0] }}>
      <PresentationControls polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 2, Math.PI / 2]}  snap speed={0.5}>
        <WindowMDL />
      </PresentationControls>
      {/* <Perf position="top-left" /> */}
      <color attach="background" args={['#47271b']} />
      <ambientLight intensity={0.1} />
      <Environment preset='warehouse' />
    </Canvas>

  )
}

export default Experience
