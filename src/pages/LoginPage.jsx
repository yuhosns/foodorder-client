import React from "react"
import { Redirect, Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import DataSource from "../data/datasource"
import FormInput from "../components/FormInput"
import BasePage from "./BasePage"
import AlertMessage from "../components/AlertMessage"

export default class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      username:         "",
      password:         "",
      validationsError: [],
      errorMessage:     null,
      isLoading:        false,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleInputChanged = this.handleInputChanged.bind(this)
  }

  render() {
    if (DataSource.shared.isLoggedIn) {
      return <Redirect to='/'/>
    }

    const { errorMessage, username, password, isLoading, validationsError } = this.state

    return (
      <BasePage isLoading={isLoading}>
        <AlertMessage errorMessage={errorMessage}/>
        <form>
          <FormInput
            id="username"
            type="username"
            label="username"
            help={validationsError.username}
            value={username}
            validationstate={validationsError.username ? "error" : null}
            onChange={this.handleInputChanged}
          />
          <FormInput
            id="password"
            type="password"
            label="Password"
            help={validationsError.password}
            value={password}
            validationstate={validationsError.password ? "error" : null}
            onChange={this.handleInputChanged}
          />
          <Button type="submit" onClick={this.handleLogin} disabled={isLoading}>Login</Button>
          <span style={{ marginLeft: 5 }}>or <Link to={"signup"}>Signup</Link></span>
        </form>
      </BasePage>
    )
  }

  handleInputChanged(event) {
    const { value, id } = event.target

    switch (id) {
      case "username":
        this.setState({
          username: value,
        })
        break
      case "password":
        this.setState({
          password: value,
        })
        break
    }
  }

  async handleLogin(e) {
    e.preventDefault()
    const { username, password } = this.state

    this.setState({
      isLoading: true,
    }, async () => {
      try {
        await DataSource.shared.login(username, password)
        this.setState({
          isLoading: false,
        })
      } catch (err) {
        this.setState({
          errorMessage: err.type || err.message,
          isLoading:    false,
        })
      }
    })
  }

}
