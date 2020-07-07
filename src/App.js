import axios from "axios"
import "./App.css"
import Search from "./components/Search"
import Main from "./components/Main"
import Footer from "./components/Footer"
import BrowserLoader from "./components/BrowserLoader"

// import image from "./img/4.jpg"

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
    defaultLocation: "Lagos",
    searchErrorMessage: "",
    browserLoading: true
  }

  getDefaultIP = async () => {
    let res = await axios.get("http://ip-api.com/json")
    try {
      if (res && res.status === 200) {
        this.setState(
          {
            geoCodeLongitude: res.data.lon,
            geoCodeLatitude: res.data.lat,
            geoCodeLocation: res.data.regionName
          },
          () => {
            this.getPublicIPWeatherData()
          }
        )
      }
    } catch (error) {
      //resort to defaults
      this.setState(
        {
          geoCodeLongitude: this.state.defaultLongitude,
          geoCodeLatitude: this.state.defaultLatitude,
          geoCodeLocation: this.state.defaultLocation
        },
        () => {
          this.getPublicIPWeatherData()
        }
      )
    }
  }

  getLocation = (data) => {
    const extractKey = Object.keys(data)
    this.setState(
      {
        [extractKey[0]]: data[extractKey[0]],
        searchErrorMessage: "",
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
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        this.state.searchParam
      )}.json?access_token=${process.env.REACT_APP_GEOCODE_API_KEY}&limit=1`
    )
    console.log(res)
    if (res.data.features.length) {
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
    } else {
      this.setState({
        searchErrorMessage: `Oops! Weather data for "${this.state.searchParam}" could not be found. Please try another location `,
        loading: false
      })
    }
  }

  getPublicIPWeatherData = async () => {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.geoCodeLatitude}&lon=${this.state.geoCodeLongitude}&units=metric&appid=${process.env.REACT_APP_FIRST_WEATHER_API_KEY}`,
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
        this.setState({ browserLoading: false, loading: false, showData: true })
      }
    )
  }

  getWeatherData = async () => {
    // JSON BIN
    let res = await axios.get(
      `https://corsanywhere-jibola.herokuapp.com/api.jsonbin.io/b/5f00dff17f16b71d48ab3a3d`,
      {
        headers: { Accept: "application/json" }
      }
    )

    // regular api
    // let res = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.geoCodeLatitude}&lon=${this.state.geoCodeLongitude}&units=metric&appid=${process.env.REACT_APP_FIRST_WEATHER_API_KEY}`,
    //   {
    //     headers: { Accept: "application/json" }
    //   }
    // )

    this.setState(
      {
        weatherDataCurrent: res.data.current,
        weatherDataHourly: res.data.hourly,
        weatherDataDaily: res.data.daily
      },
      () => {
        this.setState({ loading: false, showData: true })
      }
    )
    console.log(res.data)
  }
  componentDidMount() {
    this.getDefaultIP()
    this.setState({})
  }

  render() {
    return this.state.browserLoading ? (
      <BrowserLoader />
    ) : (
      <div className="body-container">
        <div style={{}} className="main-container">
          <h1>Weather Wizard</h1>
          <Search getLocation={this.getLocation} />
          <Main state={this.state} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
