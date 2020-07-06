import axios from "axios"
import "./App.css"
import Search from "./Search"
import Main from "./Main"
import moment from "moment"

import image from "./img/4.jpg"

import React, { Component } from "react"

class App extends Component {
  state = {
    loading: false,
    showData: false,
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
        [extractKey[0]]: data[extractKey[0]],
        loading: true,
        showData: false
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
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.geoCodeLatitude}&lon=${this.state.geoCodeLongitude}&units=metric&appid=${process.env.REACT_APP_FIRST_WEATHER_API_KEY}`,
    //   {
    //     headers: { Accept: "application/json" }
    //   }
    // )
    // console.log(res)
    // JSON BIN
    let res = await axios.get(
      `https://corsanywhere-jibola.herokuapp.com/api.jsonbin.io/b/5f00dff17f16b71d48ab3a3d`,
      {
        headers: { Accept: "application/json" }
      }
    )
    this.setState(
      {
        weatherDataCurrent: res.data.current,
        weatherDataHourly: res.data.hourly,
        weatherDataDaily: res.data.daily
      },
      () => {
        this.setState({ loading: false, showData: true })
        this.state.weatherDataHourly.map((hour) => {
          console.log(moment(hour.dt).format("HH:mm:ss A"))
          // console.log(hour.dt)
        })
      }
    )
    console.log(res.data)
  }
  componentDidMount() {
    // this.getDefaultIP()
    // this.getWeatherData()
  }

  render() {
    const style = {
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundSize: "cover"
    }

    return (
      <div style={{}} className="main-container">
        <h1>Weather App</h1>
        <Search getLocation={this.getLocation} />
        <Main state={this.state} />
      </div>
    )
  }
}

export default App
