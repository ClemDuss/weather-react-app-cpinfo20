import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import Forecast from './view/Forecast';
import SearchBar from './view/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [daily, setDaily] = useState([]);
    const [location, setLocation] = useState();

    async function searchCity(city){
        const result = await fetch(`/api/weather?city=${city}`);
        // const result = await fetch(`/api/weather/${city}`);
        const weatherData = await result.json();
        // console.log("WEATHER DATA:", weatherData);
        setDaily(weatherData.daily);
        setLocation(weatherData.location);
    }

    return (
      <div>
        <SearchBar searchCity={searchCity} />
        {location != null && location != "" &&
            <h2 className="text-center">Météo à {location}</h2>
        }
        {(location == null || location == "") &&
            <div className="text-center">
                <FontAwesomeIcon className="h2" icon={faArrowUp}/>
                <h2>Saisissez une ville à rechercher</h2>
            </div>
        }
        <Forecast daily={daily} />
      </div>
    );
  };

ReactDOM.render(<App />, document.getElementById('root'));