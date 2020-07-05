import React, { Component } from "react"
import "./HourlyForecast.css"

export class HourlyForecast extends Component {
  render() {
    return (
      <div>
        <h1>hourly</h1>

        <img
          src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`}
          alt=""
        />
        <p>{this.props.time}</p>
        <p>{this.props.desc}</p>
        <p>{this.props.temp}</p>
      </div>
    )
  }
}

export default HourlyForecast
