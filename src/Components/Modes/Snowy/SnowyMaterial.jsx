import { Environment, MeshPortalMaterial, useGLTF } from '@react-three/drei'
import Particles from '../Particles'

import SeasonalClouds from '../Clouds'
import { useStore } from '../../../Store/useStore'

const SnowyMaterial = () => {
  const { Weather } = useStore()
  const snowLand = useGLTF('/Models/snowroad.glb')

  return (
    <MeshPortalMaterial>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <color attach="background" args={['#5a5f60']} />
      <Particles count={500} mode={Weather} distanceToWindow={-0.5} />
      <SeasonalClouds position={[50, 14, 0]} bounds={[1, 1, 40]} color='#ffffff' />
      <group rotation={[0,Math.PI/2,0]} scale={[0.009,0.009,0.009]} position={[30,-5,10]}>
        <primitive object={snowLand.scene}/>
      </group>
    </MeshPortalMaterial>
  )
}

export default SnowyMaterial

// x jolo aghab 
// y bala paein