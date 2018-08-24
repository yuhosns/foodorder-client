import React from "react"
import DataSource from "../data/datasource"

export default class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      username: null,
      role:     null,
    }
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  async fetchProfile() {
    try {
      const { username, role, _id } = await DataSource.shared.getProfile()

      this.setState({
        username,
        role,
        _id,
      })

    } catch (error) {
      console.log("failt to login")
      this.setState({
        errorMessage: error.message || error.type,
      })
    }
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
    const { username, role, _id } = this.state

    if (!DataSource.shared.isLoggedIn) {
      return null
    }

    console.log("render Profile widget")

    return (
      <div style={{ marginBottom: 10 }}>
        Hello, <b>{username}</b><br/>
        ID: <b>{_id}</b>
        <div>
          Your Role: <b>{role}</b>
        </div>
        <button onClick={this.handleLogoutClick}>Log Out</button>
      </div>
    )
  }

  handleLogoutClick() {
    DataSource.shared.logout()
  }

}