import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
            <form onSubmit={handleSubmit} className="form-inline border rounded pb-3 px-3">
                <TextField label="Ville" value={city} onChange={handleCityChange}/>
                <Button type="submit" className="btn btn-primary input-group-text ml-2 mt-3" variant="contained" color="primary">
                    <FontAwesomeIcon icon={faSearch}/>&nbsp;Rechercher
                </Button>
            </form>
        </div>
    );
}

export default SearchBar;