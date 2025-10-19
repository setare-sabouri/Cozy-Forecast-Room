import { Environment, MeshPortalMaterial } from '@react-three/drei'
import Particles from '../Particles'

import SeasonalClouds from '../Clouds'
import { useStore } from '../../../Store/useStore'

const SnowyMaterial = () => {
    const {Weather}=useStore()
  
  return (
    <MeshPortalMaterial>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <color attach="background" args={['#5a5f60']} />
      <Particles count={500} mode={Weather} distanceToWindow={-0.5}/>
          <SeasonalClouds position={[50, 14, 0]} bounds={[1,1, 40]} color='#ffffff' />
    </MeshPortalMaterial>
  )
}

export default SnowyMaterial
