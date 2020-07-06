import React, { Component } from "react"
import "./CurrentForecast.css"
import moment from "moment"

export class CurrentForecast extends Component {
  render() {
    const { current, state } = this.props
    return (
      <div className="Current Current-grid lone-grid-item">
        <p>Today</p>
        <h1>{current.temp} &#8451;</h1>
        <p>RealFeel: {Math.round(current.feels_like)} &#8451;</p>
        <img
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt=""
        />

        <p className="current-weather-description">
          {current.weather[0].description}{" "}
        </p>
        <h3>
          <i className="fas fa-map-marker-alt"></i> {state.geoCodeLocation}
        </h3>
        <p>Last updated : {moment(current.dt * 1000).format("HH:mm ")}</p>
      </div>
    )
  }
}

export default CurrentForecast
