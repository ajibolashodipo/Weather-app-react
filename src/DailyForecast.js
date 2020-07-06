import React, { Component } from "react"
import "./DailyForecast.css"

export class DailyForecast extends Component {
  render() {
    const { time, icon, min, max, desc } = this.props
    return (
      <div>
        <h1>Daily</h1>
        <p>{time}</p>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <p>{desc}</p>
        <p>
          Min/Max {min} &#8451;/ {max} &#8451;
        </p>
      </div>
    )
  }
}

export default DailyForecast
