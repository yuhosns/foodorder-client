import React from "react"
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap"

export default class FormInput extends React.Component {
  render() {
    const { id, label, help, validationstate } = this.props

    let helpBlock
    if (help) {
      helpBlock = (
        <HelpBlock>
          <small>{help}</small>
        </HelpBlock>
      )
    }

    return (
      <FormGroup controlId={id} validationState={validationstate}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...this.props} />
        {helpBlock}
      </FormGroup>
    )

  }
}