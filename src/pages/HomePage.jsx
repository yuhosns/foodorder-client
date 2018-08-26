import React from "react"
import DataSource from "../data/datasource"
import BasePage from "./BasePage"
import LoginPage from "./LoginPage"
import FoodRequestPage from "./FoodRequestPage"
import OrderListPage from "./OrderListPage/OrderListPage"

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ordersChange: false,
    }
    this.handleOrdersChange = this.handleOrdersChange.bind(this)
  }

  render() {
    const { ordersChange } = this.state

    let content
    if (!DataSource.shared.isLoggedIn) {
      content = (
        <div>
          <h1>Please login to place an order</h1>
          <LoginPage/>
        </div>
      )
    } else {
      content = <FoodRequestPage onOrdersChange={this.handleOrdersChange}/>
    }

    return (
      <BasePage>
        <OrderListPage ordersChange={ordersChange}/>
        <hr/>
        {content}
      </BasePage>
    )
  }

  handleOrdersChange() {
    this.setState({
      ordersChange: !this.state.ordersChange,
    })
  }

}
