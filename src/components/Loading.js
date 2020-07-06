import React, { Component } from "react"
import "./Loading.css"

export class Loading extends Component {
  render() {
    return (
      <div className="Loading-container">
        <h1>Loading ...</h1>
        <div class="spinner-box">
          <div class="solar-system">
            <div class="earth-orbit orbit">
              <div class="planet earth"></div>
              <div class="venus-orbit orbit">
                <div class="planet venus"></div>
                <div class="mercury-orbit orbit">
                  <div class="planet mercury"></div>
                  <div class="sun"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading
