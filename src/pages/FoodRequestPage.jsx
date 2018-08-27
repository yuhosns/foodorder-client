import React from "react"
import DataSource from "../data/datasource"
import FormInput from "../components/FormInput"
import AlertMessage from "../components/AlertMessage"

export default class FoodRequestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vendor:       "",
      name:         "",
      foodNumbers:  "",
      totalAmount:  "",
      errorMessage: false,
      submitting:   false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (DataSource.shared.isLoggedIn) {
      const userName = DataSource.shared.claims.userName
      this.setState({
        name:   userName,
        vendor: "Adam",
      })
    }
  }

  render() {
    const { errorMessage, submitting } = this.state
    const userName = DataSource.shared.claims.userName
    return (
      <div className={"form-wrap"}>
        <AlertMessage errorMessage={errorMessage}/>
        <h3>Food Order Form</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>

          <FormInput
            id="vendor"
            label="vendor"
            value="Adam"
            onChange={(e) => this.handleChange(e)}
            disabled
          />

          <FormInput
            id="name"
            label="name"
            value={userName}
            disabled
          />

          <FormInput
            id="foodNumbers"
            label="foodNumbers"
            placeholder={"food numbers"}
            onChange={(e) => this.handleChange(e)}
          />

          <FormInput
            id="totalAmount"
            label="totalAmount"
            placeholder={"etc 6.5, no RM require"}
            onChange={(e) => this.handleChange(e)}
          />

          <button type="submit" disabled={submitting}>Submit</button>
        </form>
      </div>
    )
  }

  handleChange(e) {
    const { id, value } = e.target
    console.log(id)
    this.setState({
      [id]: value,
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    this.setState({
      submitting:   true,
      errorMessage: null,
    }, async () => {
      try {
        await DataSource.shared.postOrder(this.state)
        this.setState({
          submitting: false,
        })
        this.props.onOrdersChange()
      } catch (err) {
        this.setState({
          submitting:   false,
          errorMessage: err.type || err.message,
        })
        console.log(err)
      }
    })
  }

}
