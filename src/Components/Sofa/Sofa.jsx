import { useGLTF } from '@react-three/drei'

const Sofa = () => {

        const sofa = useGLTF('/Models/sofa.glb')
    
  return (
        <group scale={2.5} position={[-8.5, -4, 3.5]} rotation={[0, Math.PI/4, 0]} >
            <primitive object={sofa.scene} />
        </group>
  )
}

export default Sofa

useGLTF.preload('/Models/sofa.glb')