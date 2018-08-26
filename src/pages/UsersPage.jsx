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
    this.mounted = true

    const users = await DataSource.shared.getUsers()
    if (this.mounted) {
      this.setState({
        users,
      })
    }
  }

  async componentDidMount() {
    await this.fetchData()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { users } = this.state

    let userListNode = null
    if (!users) {
      userListNode = <p>Loading</p>
    } else {
      userListNode = users.map(user => {
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
    }

    return (
      <BasePage>
        {userListNode}
      </BasePage>
    )
  }
}
