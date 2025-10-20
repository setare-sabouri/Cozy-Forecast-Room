import { useStore } from '../Store/useStore'
import styles from './Interface.module.scss'

const Details = () => {
    const { WeatherData, CityName, Weather } = useStore()

    const localTime = new Date((WeatherData?.dt + WeatherData?.timezone) * 1000)

    return (
        <>

            <div className={styles.DetailsContainer}>

                <div className={styles.CityWeather}>
                    <h1>
                        {WeatherData && CityName
                            ? `${WeatherData.weather[0].main} in ${CityName}`
                            : `${Weather}`}
                    </h1>
                </div>

                {CityName && WeatherData &&
                    <div className={styles.weatherDetails}>
                        {/* <p>
                            {`coutry is ${WeatherData.sys.country}`}
                        </p> */}
                        <p>
                            {`${Math.round(WeatherData.main.temp)} °`}
                        </p>
                        <p>
                            {` Highest ${WeatherData.main.temp_max} ° Lowest ${WeatherData.main.temp_min} °`}
                        </p>
                        <p>
                            {`Feels like ${Math.round(WeatherData.main.feels_like)} °`}
                        </p>
                        <p>
                            {`Humidity ${WeatherData.main.humidity} %`}
                        </p>
                        <p>
                            {`Time ${localTime.toLocaleString("en-SE", { timeZone: "UTC" })} `}
                        </p>
                    </div>
                }
            </div>

        </>
    )
}

export default Details

//picton in nz day night 