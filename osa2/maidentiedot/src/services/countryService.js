import axios from "axios"

const baseurl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
    const url = `${baseurl}/all`
    const request = axios.get(url);
    return request.then(response => response.data);
}

const getAllNames = () => {
    const url = `${baseurl}/all`
    const request = axios.get(url);
    return request
        .then(response => response.data.map(country => country.name.common))
}

const getCountryData = (country) => {
    const url = `${baseurl}/name/${country}`;
    return axios.get(url);
}

const getCapitalCoords = (country) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.name}&limit=${1}&appid=${process.env.REACT_APP_API_KEY}`
    return axios.get(url).then(response => response.data);
}


const getWeather = (country) => {
    const request = getCapitalCoords(country)
        .then(data => {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${process.env.REACT_APP_API_KEY}`;
            return axios.get(url)
        })
    return request.then(response => response.data)
}

export default {getAllCountries, getAllNames, getCountryData, getWeather};