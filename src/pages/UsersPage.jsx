import React from "react"
import { Table } from "react-bootstrap"
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
      userListNode = (
        <tr>
          <td colSpan="3">Loading</td>
        </tr>
      )
      
    } else {
      userListNode = users.map(user => {
        return (
          <tr key={user._id}>
            <td>
              {user._id}
            </td>
            <td>
              {user.username}
            </td>
            <td>
              {user.role}
            </td>
          </tr>
        )
      })
    }

    return (
      <BasePage>
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th width="30%">ID</th>
            <th width="50%">Name</th>
            <th width="20%">Role</th>
          </tr>
          </thead>
          <tbody>
          {userListNode}
          </tbody>
        </Table>
      </BasePage>
    )
  }
}
