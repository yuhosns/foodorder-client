import React from "react"
import DataSource from "../data/datasource"
import BasePage from "./BasePage"

export default class UsersPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: null,
    }
  }

  async fetchData() {
    const users = await DataSource.shared.getUsers()
    this.setState({
      users,
    })
  }

  async componentDidMount() {
    await this.fetchData()
  }

  render() {
    const { users } = this.state
    if (!users) return null

    const usersNode = users.map(user => {
      return (
        <div key={user._id} style={{ marginBottom: 20, border: "1px solid #eee", padding: 10 }}>
          <div>
            <b>id</b>: {user._id}
          </div>
          <div>
            <b>name</b>: {user.username}
          </div>
        </div>
      )
    })

    return (
      <BasePage>
        {usersNode}
      </BasePage>
    )
  }
}