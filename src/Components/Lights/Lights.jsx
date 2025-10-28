import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useHelper } from '@react-three/drei'
import { useStore } from '../../Store/useStore'

const DirectionalLightVisible = (props) => {
  const ref = useRef()
  // useHelper(ref, THREE.DirectionalLightHelper, 1)
  // dispose
  useEffect(() => {
    const light = ref.current
    return () => {
      if (light?.helper) { light.helper.dispose() }
      if (light?.shadow?.map) { light.shadow.map.dispose() }
      light?.dispose?.()
    }
  }, [])
  return <directionalLight ref={ref} {...props} />
}

const Lights = () => {

  const { Weather } = useStore()

  return (
    <>
      <DirectionalLightVisible
        position={[8, 5, 10]}
        intensity={1.9}
        color={Weather === 'Sunny' ? '#bfbd63' : Weather === "Cloudy" ? '#372e2e' : Weather === "Snowy" ? "#545454": Weather === "Rainy" ? "#ae9bd5": '#a10000'}
      />

      <DirectionalLightVisible
        position={[-9, 0, 14]}
        intensity={2}
         color={Weather === 'Sunny' ? '#eeeeee' : Weather === "Cloudy" ? '#af9d9d' : Weather === "Snowy" ? "#ffffff":Weather === "Rainy" ? "#545151": '#9c9b9a'}
      />
    </>
  )
}

export default Lights
