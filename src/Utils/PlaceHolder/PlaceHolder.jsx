const PlaceHolder = (props) => {
    return (
        <mesh {...props}>
            <boxGeometry args={[10, 10, 10, 10, 10, 1]} />
            <meshBasicMaterial color="white" wireframe />
        </mesh>
    )
}

export default PlaceHolder