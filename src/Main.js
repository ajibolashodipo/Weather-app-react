import React, { Component } from "react"
import HourlyForecast from "./HourlyForecast"
import DailyForecast from "./DailyForecast"
import CurrentForecast from "./CurrentForecast"
import "./Main.css"
import moment from "moment"

export class Main extends Component {
  state = {
    hourArray: []
  }

  render() {
    const { state } = this.props
    const current = this.props.state.weatherDataCurrent
    const hourly = this.props.state.weatherDataHourly
    const daily = this.props.state.weatherDataDaily

    if (state.loading) {
      return (
        <div className="">
          <h1>Loading...</h1>
        </div>
      )
    }

    const byTheHour = hourly.map((hour, index) =>
      index > 0 && index < 6 ? (
        <HourlyForecast
          time={moment(hour.dt * 1000).format("HH:mm ")}
          // time={hour.dt}
          key={index}
          id={index}
          icon={hour.weather[0].icon}
          desc={hour.weather[0].main}
          temp={hour.temp}
        />
      ) : null
    )

    const byTheDay = daily.map((day, index) =>
      index > 0 ? (
        <DailyForecast
          time={moment(day.dt * 1000).format("ddd, MMM D")}
          key={index}
          id={index}
          icon={day.weather[0].icon}
          min={day.temp.min}
          max={day.temp.max}
          desc={day.weather[0].main}
        />
      ) : null
    )

    return (
      <div className="Main">
        {this.props.state.showData && (
          <div className="Grid-container">
            <CurrentForecast current={current} state={state} />
            {byTheHour}
            {byTheDay}
          </div>
        )}
      </div>
    )
  }
}

export default Main
