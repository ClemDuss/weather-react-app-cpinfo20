import React from 'react';

import WeatherCard from './WeatherCard';

class Forecast extends React.Component{
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {this.props.daily.map(day=>(
                            <div className="col-lg-3 col-sm-6 col-xs-12">
                                <WeatherCard dateValue={day.dt} temperature={day.temp} weather={day.weather[0]} />
                            </div>
                        ))}

                        {/* <p>
                                {day.temp.max} {day.weather[0].description}
                            </p> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Forecast;