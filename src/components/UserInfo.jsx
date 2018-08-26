import React from "react"
import DataSource from "../data/datasource"

export default class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: null,
      userRole: null,
    }
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  async fetchProfile() {
    try {
      const { userName, userRole, userID } = await DataSource.shared.claims

      this.setState({
        userName,
        userRole,
        userID,
      })

    } catch (error) {
      console.log(error)
      console.log("failed to login")
      if (error.type === "token_invalid") {
        DataSource.shared.logout()
      }
      this.setState({
        errorMessage: error.message || error.type,
      })
    }
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
    const { userName, userRole, userID } = this.state

    if (!DataSource.shared.isLoggedIn) {
      return null
    }

    console.log("render Profile widget")

    return (
      <div style={{ marginBottom: 10 }}>
        Hello, <b>{userName}</b><br/>
        ID: <b>{userID}</b>
        <div>
          Role: <b>{userRole}</b>
        </div>
        <button onClick={this.handleLogoutClick}>Log Out</button>
      </div>
    )
  }

  handleLogoutClick() {
    DataSource.shared.logout()
  }

}
