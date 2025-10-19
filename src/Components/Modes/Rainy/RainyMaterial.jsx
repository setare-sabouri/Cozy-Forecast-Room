import { Clouds, Environment, MeshPortalMaterial } from '@react-three/drei'
import Particles from '../Particles';
import SeasonalClouds from '../Clouds';
import { useStore } from '../../../Store/useStore';


const RainyMaterial = ({ count = 500 }) => {
  const { Weather} = useStore()


  return (
    <MeshPortalMaterial>
      <ambientLight intensity={0.8} />
      <Environment preset="lobby" />
      <color attach="background" args={['#08103d']} />
      <Clouds>
        <SeasonalClouds position={[7, 8, 0]} bounds={[5, 1, 8]} color='#646bce' />
        <SeasonalClouds position={[7, 8, 1]} bounds={[5, 1, 8]} color='#194682' />
      </Clouds>

      <Particles count={200} mode={Weather} distanceToWindow={0.7} />
    </MeshPortalMaterial>
  )
}

export default RainyMaterial
