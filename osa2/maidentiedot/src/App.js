import {useState, useEffect} from "react";
import countryService from "./services/countryService"

import Searchbar from "./components/searchbar/Searchbar";
import CountryList from "./components/countrylist/CountryList";
import CountryDisplay from "./components/countrydisplay/CountryDisplay";
import WeatherDisplay from "./components/weatherdisplay/WeatherDisplay";


const App = () => {

  const [countryNames, setCountryNames] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [searchvalue, setSearchValue] = useState("");
  const [coutryToDisplay, setCoutryToDisplay] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAllNames()
      .then(data => {
        setCountryNames(data);
        setSearchedCountries(data);
      })
  }, []);

  useEffect(() => {
    if(!searchedCountries) return;
    
    if (searchedCountries.length === 1){
      if(searchedCountries[0] != coutryToDisplay) setCoutryToDisplay(searchedCountries[0]);
    } 
    else setCoutryToDisplay(null);

  }, [searchedCountries])

  useEffect(() => {
    if(!coutryToDisplay) {
      setCountryData(null)
      setWeather(null)
      return;
    }
    countryService.getCountryData(coutryToDisplay)
      .then(response => {
        setCountryData(response.data);
        countryService.getWeather(response.data).then(data => {setWeather(data)});
      });

  }, [coutryToDisplay])

  useEffect(() => {
  }, [countryData])

  const updateSearch = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    setSearchedCountries(countryNames.filter(country => country.includes(newSearchValue)));
  }

  const handleShow = (countryName) => {
    setSearchValue(countryName);
    setSearchedCountries(countryNames.filter(country => country.includes(countryName)));
  }

  return (
    <div>
      <Searchbar value={searchvalue} handleChange={updateSearch}/>
      <CountryList countryNames={searchedCountries} showHandler={handleShow}/>
      <CountryDisplay country={countryData}/>
      <WeatherDisplay country={countryData} weather={weather}/>
    </div>
  )
}

export default App;
