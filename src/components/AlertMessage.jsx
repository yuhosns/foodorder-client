import React from "react"
import { Alert } from "react-bootstrap"

export default class AlertMessage extends React.Component {
  render() {
    const { errorMessage, err, infoMessage, onDismiss } = this.props

    if (!errorMessage && !err && !infoMessage) {
      return null
    }

    let bsStyle = "danger"
    let hint = "Error:"

    if (infoMessage) {
      bsStyle = "info"
      hint = null
    }

    return (
      <Alert bsStyle={bsStyle} onDismiss={onDismiss}>
        <p><strong>{hint} </strong> {errorMessage || infoMessage || err}</p>
      </Alert>
    )

  }
}