import axios from "axios"
import "./App.css"
import Search from "./components/Search"
import Main from "./components/Main"
import Footer from "./components/Footer"
import BrowserLoader from "./components/BrowserLoader"

// import image from "./img/4.jpg"

import React, { Component, Fragment } from "react"

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
    defaultLocation: "Lagos, Nigeria",
    searchErrorMessage: "",
    browserLoading: true
  }

  getDefaultIP = async () => {
    try {
      let trip = await axios.get("https://api.ipify.org/?format=json")
      let tripIP = trip.data.ip
      let res = await axios.get(`https://ipapi.co/${tripIP}/json/`)
      //random
      if (!res.data && !trip.data) {
        throw new Error("An error occurred")
      }

      this.setState(
        {
          geoCodeLongitude: res.data.longitude,
          geoCodeLatitude: res.data.latitude,
          geoCodeLocation: res.data.city
        },
        () => {
          this.getPublicIPWeatherData()
        }
      )
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
    // sends request to openweather api
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
        this.setState({ loading: false, showData: true })
      }
    )
  }
  componentDidMount() {
    this.getDefaultIP()
    this.setState({})
  }

  render() {
    return this.state.browserLoading ? (
      <BrowserLoader />
    ) : (
      <Fragment>
        <div className="main-container">
          <h1>Weather Wizard</h1>
          <Search getLocation={this.getLocation} />
          <Main state={this.state} />
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default App
