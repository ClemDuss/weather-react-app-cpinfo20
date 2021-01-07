import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import '../shared/style/global.css';

class WeatherCard extends React.Component{
    render(){
        return(
            <div className="text-center my-5 border rounded py-2 bg-weather-card">
                <h3>{getStringDate(this.props.dateValue)}</h3>
                <img src={`http://openweathermap.org/img/wn/${this.props.weather.icon}@2x.png`} alt="icon météo"/>
                <p>{firstLetterToUpper(this.props.weather.description)}</p>
                <p>
                    <span className="bg-primary text-light rounded px-1 mr-1">
                        <FontAwesomeIcon icon={faArrowDown} /> {Math.round(this.props.temperature.min)}°C
                    </span>
                    <span className="bg-danger text-light rounded px-1">
                        <FontAwesomeIcon icon={faArrowUp}/> {Math.round(this.props.temperature.max)}°C
                    </span>
                </p>
            </div>
        );
    }
}

function getStringDate(dateValue){
    let stringDate;
    const theDate = new Date(dateValue * 1000);
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const today = new Date();

    if(theDate.getDate() + theDate.getMonth() + theDate.getFullYear() === today.getDate() + today.getMonth() + today.getFullYear()){
        stringDate = "Aujourd'hui";
    }else{
        stringDate = `${theDate.getDate()} ${monthNames[theDate.getMonth()]} ${theDate.getFullYear()}`
    }

    return stringDate;
}


function firstLetterToUpper(string){
    let firstLetter = string.substr(0,1).toUpperCase();
    let end = string.substr(1);
    return firstLetter+end;
}

export default WeatherCard;