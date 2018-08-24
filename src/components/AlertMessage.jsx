import React from "react"
import { Alert } from "react-bootstrap"

export default class AlertMessage extends React.Component {
  render() {
    const { errorMessage, onDismiss } = this.props

    if (errorMessage !== undefined && errorMessage !== null && errorMessage !== "") {
      return (
        <Alert bsStyle="danger" onDismiss={onDismiss}>
          <p><strong>Error: </strong> {errorMessage}</p>
        </Alert>
      )
    } else return null
  }
}