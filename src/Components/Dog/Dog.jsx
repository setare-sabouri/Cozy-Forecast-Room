import { useGLTF } from '@react-three/drei'

const Dog = () => {

    const dog = useGLTF('/Models/dog.glb')

    const handleClick = (e) => {
        console.log(e)
        const audio = new Audio("./Audios/dog.mp3");
        audio.play();
    }

    return (
        <group scale={2} position={[-9.5, -4, 8]} rotation={[0, -Math.PI / 3, 0]} onClick={handleClick}>
            <primitive object={dog.scene} />
        </group>
    )
}

export default Dog


useGLTF.preload('/Models/dog.glb')
