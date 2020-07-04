import React, { Component } from "react"
import "./Main.css"

export class Main extends Component {
  render() {
    const { state } = this.props
    const current = this.props.state.weatherDataCurrent
    const hourly = this.props.state.weatherHourlyCurrent
    const daily = this.props.state.weatherDailyCurrent
    return (
      <div>
        <div className="">
          <h3>Today</h3>
          <p>{current.temp} degrees</p>
          <img
            // src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>Feels like {current.feels_like}</p>
          <p>Thunderstorm: {json.current.weather[0].description} </p>
          <p>{state.geoCodeLocation}</p>
          <p>Updated : {current.dt}</p>
          <p>
            Sunrise/Sunset :{current.sunrise}/{current.sunset}{" "}
          </p>
        </div>
      </div>
    )
  }
}

export default Main
