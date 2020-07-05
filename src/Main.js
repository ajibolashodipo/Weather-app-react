import React, { Component } from "react"
import HourlyForecast from "./HourlyForecast"
import DailyForecast from "./DailyForecast"
import "./Main.css"

export class Main extends Component {
  state = {
    hourArray: []
  }

  render() {
    const { state } = this.props
    const current = this.props.state.weatherDataCurrent
    const hourly = this.props.state.weatherDataHourly
    const daily = this.props.state.weatherDataDaily

    const byTheHour = hourly.map((hour, index) =>
      index < 6 ? (
        <HourlyForecast
          time={hour.dt}
          key={index}
          icon={hour.weather[0].icon}
          desc={hour.weather[0].main}
          temp={hour.temp}
        />
      ) : null
    )

    const byTheDay = daily.map((day, index) =>
      index > 0 ? (
        <DailyForecast
          time={day.dt}
          key={index}
          icon={day.weather[0].icon}
          min={day.temp.min}
          max={day.temp.max}
          desc={day.weather[0].main}
        />
      ) : null
    )

    if (state.loading) {
      return (
        <div className="">
          <h1>Loading...</h1>
        </div>
      )
    }

    return (
      <div>
        {this.props.state.showData && (
          <div className="">
            <h3>Today</h3>
            <p>{current.temp} degrees</p>
            <img
              src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
              alt=""
            />
            <p>Feels like {current.feels_like}</p>
            <p>{current.weather[0].description} </p>
            <p>{state.geoCodeLocation}</p>
            <p>Updated : {current.dt}</p>
            <p>
              Sunrise/Sunset :{current.sunrise}/{current.sunset}
            </p>
          </div>
        )}
        <div className="">{byTheHour}</div>
        <div className="">{byTheDay}</div>
      </div>
    )
  }
}

export default Main
