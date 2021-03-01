import React from 'react'
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = 'ad8ea940cb2afc1969188c072a7c252a';

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        let city = e.target.elements.city.value;

        if (city) {
            const api_url = await
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json()
            if(data.cod === '404'){
                return this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    error:"City not found"
                });
            }

            let pressure = data.main.pressure;
            let pressureInMmHg = Math.floor(pressure * 0.75006);

            let sunset = data.sys.sunset*1000;
            let date = new Date();
            date.setTime(sunset);
            let sunset_date = date.toLocaleTimeString();

            this.setState({
                temp: parseFloat((data.main.temp).toFixed(1)),
                city: data.name,
                country: data.sys.country,
                pressure: pressureInMmHg,
                sunset: sunset_date,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: 'Enter the name of the city!'
            })
        }
    }

    render() {
        return(
            <div className='wrapper'>
                <div className="main">
                    <div className="container">
                        <row>
                            <div className='info'>
                                <Info/>
                            </div>
                            <div className='form'>
                                <Form weatherMethod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </row>
                    </div>
                </div>
            </div>
        )
    }
}

export default App