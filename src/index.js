import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './shared/style/flags.min.css';

import Forecast from './view/Forecast';
import SearchBar from './view/SearchBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
    const [daily, setDaily] = useState([]);
    const [location, setLocation] = useState();
    const [country, setCountry] = useState();
    const [county, setCounty] = useState();
    const [state, setState] = useState();
    const [open, setOpen] = React.useState(false);
    const [onLoad, setOnLoad] = useState(false);

    async function searchCity(city){
        setOnLoad(true);
        try{
          const result = await fetch(`/api/weather?city=${city}`);
          // const result = await fetch(`/api/weather/${city}`);
          const weatherData = await result.json();
          setDaily(weatherData.daily);
          setLocation(weatherData.location);
          setCountry(weatherData.country);
          setCounty(weatherData.county);
          setState(weatherData.state);
        }catch(e){
          setOpen(true);
        }
        setOnLoad(false);
    }
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    return (
      <div>
        <SearchBar searchCity={searchCity} />
        {onLoad == true &&
          <div className="d-flex justify-content-center">
            <LinearProgress style={{minWidth: '300px', maxWidth: '300px', marginTop: '-20px'}}/>
          </div>
        }
        {location != null && location != "" &&
            <div>
                <h2 className="text-center">Météo à {location}</h2>
                <div className="text-center">
                  <span className="country-flag">
                    <span className={'flag flag-' + country}></span>
                  </span>
                  <span className="country-label">
                    {county + ', ' + state}
                  </span>
                </div>
            </div>
        }
        {(location == null || location == "") &&
            <div className="text-center">
                <FontAwesomeIcon className="h2" icon={faArrowUp}/>
                <h2>Saisissez une ville à rechercher</h2>
            </div>
        }
        
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          style={{top: '80px'}}
        >
          <Alert onClose={handleClose} severity="error">
            La ville recherchée est inconnue!
          </Alert>
        </Snackbar>
        <Forecast daily={daily} />
      </div>
    );
  };

ReactDOM.render(<App />, document.getElementById('root'));