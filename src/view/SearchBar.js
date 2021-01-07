import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';

const SearchBar =props => {
    const [city, setCity] = useState("");

    function handleCityChange(event){
        setCity(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        // console.log("Recherche pour : ", city);
        props.searchCity(city);
    }

    return(
        <div className="d-flex justify-content-center mb-4 mt-2">
            <form onSubmit={handleSubmit} className="form-inline">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span class="input-group-text">Ville</span>
                    </div>
                    <input 
                        type="text"
                        placeholder="Saisir une ville"
                        className="form-control"
                        value={city}
                        onChange={handleCityChange}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary input-group-text"><FontAwesomeIcon icon={faSearch}/>&nbsp;Rechercher</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;