import React, { Component } from "react"
import "./Loading.css"

export class Loading extends Component {
  render() {
    return (
      <div className="Loading-container">
        <div className="spinner-box">
          <div className="solar-system">
            <div className="earth-orbit orbit">
              <div className="planet earth"></div>
              <div className="venus-orbit orbit">
                <div className="planet venus"></div>
                <div className="mercury-orbit orbit">
                  <div className="planet mercury"></div>
                  <div className="sun"></div>
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
