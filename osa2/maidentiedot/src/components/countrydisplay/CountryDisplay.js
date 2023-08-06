
const CountryDisplay = ({country}) => {
    if (country === null) return null;
 
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <div>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map(language => 
                        <li key={language}>
                            {language}
                        </li>  
                    )}
                </ul>
            </div>
            <img src={country.flags.png}></img>
        </div>
    )
}

export default CountryDisplay;