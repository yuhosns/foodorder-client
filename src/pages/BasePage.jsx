import React from "react"
import { Grid } from "react-bootstrap"

export default class BasePage extends React.Component {

  render() {
    return (
      <Grid>
        {this.props.children}
      </Grid>
    )
  }
}