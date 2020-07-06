import React, { Component } from "react"
import "./Search.css"

class Search extends Component {
  state = {
    searchParam: "",
    errorMessage: ""
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //Validate against empty query
    if (!this.state.searchParam) {
      this.setState({ errorMessage: "Please enter a location" }, () => {
        setTimeout(() => {
          this.setState({ errorMessage: "" })
        }, 3000)
      })
      return
    }

    this.props.getLocation(this.state)

    // this.setState({ searchParam: "" })
  }

  render() {
    return (
      <div className="Search">
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-inner-container">
            <label htmlFor="searchParam">Location</label>
            <input
              type="text"
              id="searchParam"
              placeholder="Type in a location"
              onChange={this.handleChange}
              value={this.state.searchParam}
              className="Search-form"
            />
            <button>Search</button>
          </div>
        </form>
        <p className="alert-empty-location">{this.state.errorMessage}</p>
      </div>
    )
  }
}

export default Search
