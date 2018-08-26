import React from "react"
import { Grid } from "react-bootstrap"

export default class BasePage extends React.Component {
  render() {
    const { isLoading } = this.props

    let loadingHint = null
    if (isLoading) {
      loadingHint =
        <div className={"loading-hint"}>
          Loading
        </div>
    }

    return (
      <Grid>
        {loadingHint}
        {this.props.children}
      </Grid>
    )
  }
}
