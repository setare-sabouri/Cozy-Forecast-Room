const PlaceHolder = (props) => {
    return (
        <mesh {...props}>
            <boxGeometry args={[10, 10, 10, 10, 10, 1]} />
            <meshBasicMaterial wireframe color="#75e5f7" opacity={0.6} transparent />
        </mesh>
    )
}

export default PlaceHolder