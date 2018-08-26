import React from "react"
import { Redirect } from "react-router-dom"
import { Button } from "react-bootstrap"
import DataSource from "../data/datasource"
import FormInput from "../components/FormInput"
import BasePage from "./BasePage"
import AlertMessage from "../components/AlertMessage"

export default class SignUpPage extends React.Component {
  constructor() {
    super()
    this.state = {
      username:         "",
      password:         "",
      confirmPassword:  "",
      isLoading:        false,
      validationsError: [],
    }
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleInputChanged = this.handleInputChanged.bind(this)
  }

  render() {
    if (DataSource.shared.isLoggedIn) {
      return <Redirect to='/'/>
    }
    const { errorMessage, username, password, confirmPassword, isLoading, validationsError } = this.state

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

          {/*
          <FormInput
            id="confirmPassword"
            type="password"
            label="confirmPassword"
            help={validationsError.confirmPassword}
            value={confirmPassword}
            validationstate={validationsError.confirmPassword ? "error" : null}
            onChange={this.handleInputChanged}
          />
          */}

          <Button type="submit" onClick={this.handleSignUp} disabled={isLoading}>SignUp</Button>
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
      case "confirmPassword":
        this.setState({
          confirmPassword: value,
        })
        break
    }
  }

  async handleSignUp(e) {
    e.preventDefault()
    const { username, password, confirmPassword } = this.state

    this.setState({
      isLoading: true,
    }, async () => {
      try {
        await DataSource.shared.signup(username, password, confirmPassword)
        await DataSource.shared.login(username, password)
        this.setState({
          isLoading: false,
        })
        window.location.replace("/")
      } catch (err) {
        if (err.type === "validation_failed") {
          this.parseValidationError(err.validationErrors)
        } else {
          this.setState({
            errorMessage: err.type || err.message,
            isLoading:    false,
          })
        }
      }
    })

  }

  parseValidationError(validationErrors) {
    const { validationsError } = this.state

    validationErrors.forEach((validationError) => {
      switch (validationError.field) {
        case "username" :
          validationsError.username = validationError.type
          break
        case "password" :
          validationsError.password = validationError.type
          break
      }
    })
  }

}
