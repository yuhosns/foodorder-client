import React from "react"
import DataSource from "../data/datasource"
import FormInput from "../components/FormInput"
import BasePage from "./BasePage"
import AlertMessage from "../components/AlertMessage"

export default class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      name:             "",
      username:         "",
      password:         "",
      confirmPassword:  "",
      validationsError: [],
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleInputChanged = this.handleInputChanged.bind(this)
  }

  componentDidMount(){
    if (DataSource.shared.isLoggedIn) {
      window.location.replace("/")
    }
  }

  render() {
    console.log("render component Login ")
    const { errorMessage, name, username, password, confirmPassword, validationsError } = this.state

    return (
      <BasePage>
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

          <button type="submit" onClick={this.handleLogin}>Login</button>
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

  async handleLogin(e) {
    e.preventDefault()
    const { username, password } = this.state
    try {
      await DataSource.shared.login(username, password)
    } catch (err) {
      if (err.type === "validation_failed") {
        this.parseValidationError(err.validationErrors)
      } else {
        this.setState({
          errorMessage: err.type,
          isSubmitting: false,
        })
      }
    }
  }

  async handleSignUp(e) {
    e.preventDefault()
    const { name, username, password, confirmPassword } = this.state
    try {
      await DataSource.shared.register(username, name, password, confirmPassword)
    } catch (err) {
      if (err.type === "validation_failed") {
        this.parseValidationError(err.validationErrors)
      } else {
        this.setState({
          errorMessage: err.type,
          isSubmitting: false,
        })
      }
    }
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