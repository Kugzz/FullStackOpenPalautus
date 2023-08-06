
const WeatherDisplay = ({country, weather}) => {
    if(country == null || weather == null) return null;
    const imgstyle = {
        width: 200,
        height: 200
    }
    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius </p>
            <img style={imgstyle} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>wind {(weather.wind.speed).toFixed(2)} m/s</p>
        </div>
    )
}

export default WeatherDisplay;