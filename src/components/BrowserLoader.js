import React, { Component } from "react"
import "./BrowserLoader.css"
import Loading from "./Loading"

export class BrowserLoader extends Component {
  render() {
    return (
      <div className="browser-loader">
        <div className="inner">
          <h1>Loading</h1>
          <Loading />
        </div>
      </div>
    )
  }
}

export default BrowserLoader
