import React, { Component } from "react"
import HourlyForecast from "./HourlyForecast"
import DailyForecast from "./DailyForecast"
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
      index < 6 ? (
        <HourlyForecast
          time={moment(hour.dt * 1000).format("HH:mm ")}
          // time={hour.dt}
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
          time={moment(day.dt * 1000).format("ddd, MMM D")}
          key={index}
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
          <div className="">
            <div className="Current">
              <h3>Today</h3>
              <p>{current.temp} &#8451;</p>
              <img
                src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                alt=""
              />
              <p>Feels like {current.feels_like} &#8451;</p>
              <p>{current.weather[0].description} </p>
              <p>{state.geoCodeLocation}</p>
              <p>Updated : {moment(current.dt * 1000).format("HH:mm ")}</p>
              <p>
                Sunrise/Sunset :
                {moment(current.sunrise * 1000).format("HH:mm ")}/
                {moment(current.sunset * 1000).format("HH:mm ")}
              </p>
            </div>
            <div className="Hourly">{byTheHour}</div>
            <div className="Daily">{byTheDay}</div>
          </div>
        )}
      </div>
    )
  }
}

export default Main
