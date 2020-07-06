import React, { Component } from "react"
import "./HourlyForecast.css"

export class HourlyForecast extends Component {
  render() {
    return (
      <div className={` Hourly Hourly-grid-${this.props.id} lone-grid-item`}>
        <p>{this.props.time}</p>

        <img
          src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`}
          alt=""
        />

        <p>{this.props.desc}</p>
        <p>{Math.round(this.props.temp)} &#8451;</p>
      </div>
    )
  }
}

export default HourlyForecast
