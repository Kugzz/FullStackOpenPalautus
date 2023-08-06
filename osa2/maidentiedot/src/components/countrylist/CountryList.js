import ShowButton from "./showbutton/ShowButton";

const CountryList = ({countryNames, showHandler}) => {
    if (countryNames.length <= 1) return null;
    if (countryNames.length > 10) return (<div>Too many matches</div>)

    return (
        <div>
            <ul>
                {countryNames.map(country => 
                    <li key={country}>
                        {country} <ShowButton countryName={country} showHandler={showHandler}/>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default CountryList;