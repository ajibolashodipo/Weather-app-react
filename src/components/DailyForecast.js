import React, { Component } from "react"
import "./DailyForecast.css"

export class DailyForecast extends Component {
  render() {
    const { time, icon, min, max, desc } = this.props
    return (
      <div className={`Daily Daily-grid-${this.props.id} lone-grid-item`}>
        <p>{time}</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <p>{desc}</p>
        <p>
          {Math.round(max)} &#8451; / {Math.round(min)} &#8451;
        </p>
      </div>
    )
  }
}

export default DailyForecast
