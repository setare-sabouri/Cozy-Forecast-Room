import { Cloud } from '@react-three/drei'
import { useStore } from '../../Store/useStore'


const SeasonalClouds = ({ position = [10, 9, 0], bounds = [1, 1, 10], color = "#d0c9c9" }) => {
    const { Weather } = useStore()
    return (
        <Cloud
            position={position}
            bounds={bounds}
            color={color}
            fade={50}
            speed={Weather === 'Stormy' ? 0.8 : Weather === 'Rainy' ? 0.2 : Weather === 'Cloudy' ? 0.3 : Weather === 'Snowy' ? 0.1 : 5}
            growth={Weather === 'Stormy' ? 8 : Weather === 'Rainy' ? 6 : Weather === 'Cloudy' ? 1 : Weather === 'Snowy' ? 0.1 : 5}
            segments={40}
            volume={Weather === 'Stormy' ? 10 : Weather === 'Rainy' ? 0 : Weather === 'Cloudy' ? 18 : Weather === 'Snowy' ? 30 : 5}
        />
    )
}

export default SeasonalClouds
