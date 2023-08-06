
const ShowButton = ({countryName, showHandler}) => {
    return(
        <div>
            <button onClick={() => showHandler(countryName)}>Show</button>
        </div>
    );
}

export default ShowButton; 