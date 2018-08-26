import React from "react"
import DataSource from "../../data/datasource"
import BasePage from "../BasePage"
import AlertMessage from "../../components/AlertMessage"

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
    }
  }

  async fetchData() {
    this.mounted = true

    try {
      const profile = await DataSource.shared.getProfile()
      if (this.mounted) {
        this.setState({
          profile,
        })
      }
    } catch (err) {
      this.setState({
        err: err.type,
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
    const { profile, err } = this.state
    if (!profile) return null

    return (
      <BasePage>
        <AlertMessage errorMessage={err}/>
        <h1>Profile Page</h1>
        <div style={{ marginBottom: 20, border: "1px solid #eee", padding: 10 }}>
          <div>
            <b>id</b>: {profile._id}
          </div>
          <div>
            <b>name</b>: {profile.username}
          </div>
        </div>
      </BasePage>
    )
  }
}
