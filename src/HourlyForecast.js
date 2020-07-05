import React, { Component } from "react"

export class HourlyForecast extends Component {
  render() {
    return (
      <div>
        <h1>hourly</h1>
        <p>{this.props.time}</p>
        <p>{this.props.desc}</p>
        <p>{this.props.temp}</p>
      </div>
    )
  }
}

export default HourlyForecast
