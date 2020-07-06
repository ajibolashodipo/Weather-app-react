import React, { Component } from "react"
import "./Loading.css"

export class Loading extends Component {
  render() {
    return (
      <div className="Loading-container">
        <h1>Loading ...</h1>
        <div class="spinner-box">
          <div class="configure-border-1">
            <div class="configure-core"></div>
          </div>
          <div class="configure-border-2">
            <div class="configure-core"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading
