import React, { Component } from "react"
import "./Loading.css"

export class Loading extends Component {
  render() {
    return (
      <div className="Loading-container">
        <h1>Loading ...</h1>
        <div class="spinner-box">
          <div class="circle-border">
            <div class="circle-core"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading
