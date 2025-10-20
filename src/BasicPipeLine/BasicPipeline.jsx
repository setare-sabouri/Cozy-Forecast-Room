import { Bloom, EffectComposer } from '@react-three/postprocessing'

const BasicPipeLine = () => {

    return (

        <EffectComposer >
            <Bloom
                intensity={1}        
                luminanceThreshold={0}  
                luminanceSmoothing={4}
            />
        </EffectComposer>

    )
}

export default BasicPipeLine
