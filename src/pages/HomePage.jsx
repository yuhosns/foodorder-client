import React from "react"
import DataSource from "../data/datasource"
import BasePage from "./BasePage"
import LoginPage from "./LoginPage"
import FoodRequestPage from "./FoodRequestPage"
import OrderListPage from "./OrderListPage"

export default class HomePage extends React.Component {
  render() {
    let content
    if (!DataSource.shared.isLoggedIn) {
      content = (
        <div>
          <h1>Please login to place an order</h1>
          <LoginPage/>
        </div>
      )
    } else {
      content = <FoodRequestPage/>
    }

    return (
      <BasePage>
        <OrderListPage/>
        <hr/>
        {content}
      </BasePage>
    )
  }

  //

}
