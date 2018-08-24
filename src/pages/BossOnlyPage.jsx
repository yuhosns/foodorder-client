import React from "react"
import DataSource from "../data/datasource"
import BasePage from "./BasePage"
import AlertMessage from "../components/AlertMessage"

export default class BossOnlyPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "You are not allow to view this secret message",
    }
  }

  async fetchData() {
    try {
      const message = await DataSource.shared.getBossMessage()
      console.log(message)
      this.setState({
        message,
      })
    } catch (err) {
      this.setState({
        err: err.type,
      })
    }
  }

  async componentDidMount() {
    await this.fetchData()
    console.log("wei")
  }

  render() {
    const { message, err } = this.state
    console.log(message)
    return (
      <BasePage>
        <AlertMessage errorMessage={err}/>
        <h3>Message: <b>{message}</b></h3>
        <p>Only Boss can see the message</p>
      </BasePage>
    )
  }
}