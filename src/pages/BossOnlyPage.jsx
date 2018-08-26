import React from "react"
import DataSource from "../data/datasource"
import BasePage from "./BasePage"
import AlertMessage from "../components/AlertMessage"

export default class BossOnlyPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "checking authentication...",
    }
  }

  async fetchData() {
    this.mounted = true
    try {
      const message = await DataSource.shared.getBossMessage()
      if (this.mounted) {
        this.setState({
          message,
        })
      }
    } catch (err) {
      this.setState({
        err: err.type,
        message: "You are not allow to view this secret message",
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
    const { message, err } = this.state

    return (
      <BasePage>
        <AlertMessage errorMessage={err}/>
        <h3>Message: <b>{message}</b></h3>
        <p>Only Boss can see the message</p>
      </BasePage>
    )
  }
}
