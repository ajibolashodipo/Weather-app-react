import logo from "./logo.svg"
import axios from "axios"
import "./App.css"
import Search from "./Search"

import React, { Component } from "react"

class App extends Component {
  state = {
    loading: false,
    weatherDataCurrent: {},
    weatherDataHourly: [],
    weatherDataDaily: [],
    searchParam: "",
    geoCodeLatitude: "",
    geoCodeLongitude: "",
    geoCodeLocation: "",
    onLoadLongitude: "",
    onLoadLatitude: "",
    onLoadLocation: "",
    defaultLatitude: 6.4474,
    defaultLongitude: 3.3903,
    defaultLocation: "Lagos"
  }

  getDefaultIP = async () => {
    let res = await axios.get("http://ip-api.com/json")
    this.setState({
      onLoadLongitude: res.data.lon,
      onLoadLatitude: res.data.lat,
      onLoadLocation: res.data.regionName
    })
  }

  getLocation = (data) => {
    const extractKey = Object.keys(data)
    this.setState(
      {
        [extractKey[0]]: data[extractKey[0]]
      },
      () => {
        this.getCoordinates()
      }
    )
  }

  getCoordinates = async () => {
    let res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/
${encodeURIComponent(this.state.searchParam)}.json?access_token=${
        process.env.REACT_APP_GEOCODE_API_KEY
      }&limit=1`
    )
    this.setState(
      {
        geoCodeLatitude: res.data.features[0].center[1],
        geoCodeLongitude: res.data.features[0].center[0],
        geoCodeLocation: res.data.features[0].place_name
      },
      () => {
        this.getWeatherData()
      }
    )
  }

  getWeatherData = async () => {
    // let res = await axios.get(
    //   `https://corsanywhere-jibola.herokuapp.com/api.openweathermap.org/data/2.5/onecall?lat=6.6&lon=6.6&%20exclude={part}&appid=${process.env.REACT_APP_FIRST_WEATHER_API_KEY}`,
    //   {
    //     headers: { Accept: "application/json" }
    //   }
    // )
    // console.log(res)
    // JSON BIN
    let res = await axios.get(
      `https://corsanywhere-jibola.herokuapp.com/api.jsonbin.io/b/5effd2fe7f16b71d48aacc9a`,
      {
        headers: { Accept: "application/json" }
      }
    )

    this.setState({
      weatherDataCurrent: res.data.current,
      weatherDataHourly: res.data.hourly,
      weatherDataDaily: res.data.daily
    })
    console.log(res.data)
  }
  componentDidMount() {
    // this.getDefaultIP()
    // this.getWeatherData()
  }

  render() {
    return (
      <div>
        <h1>Weather App</h1>
        <Search getLocation={this.getLocation} />
      </div>
    )
  }
}

export default App
