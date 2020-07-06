import React, { Component } from "react"
import "./Search.css"

class Search extends Component {
  state = {
    searchParam: ""
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getLocation(this.state)
    this.setState({ searchParam: "" })
  }

  render() {
    return (
      <div className="Search">
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="searchParam">Enter City</label>
          <input
            type="text"
            id="searchParam"
            placeholder="Lagos, Nigeria"
            onChange={this.handleChange}
            value={this.state.searchParam}
            className="Search-form"
          />
          <button>Search</button>
        </form>
      </div>
    )
  }
}

export default Search
