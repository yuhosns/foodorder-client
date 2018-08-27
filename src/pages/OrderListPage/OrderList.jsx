import React from "react"
import { Row, Col, Tabs, Tab, Modal, Button } from "react-bootstrap"
import OrderListItem from "./OrderListItem"
import "./OrderListPage.css"

export default class OrderList extends React.Component {
  render() {
    const { orders, onRequestDelete, totalToPay, summaryButton } = this.props
    return (
      <React.Fragment>
        <Row>
          {
            orders.map(order => {
              return (
                <OrderListItem order={order} key={order._id} onRequestDelete={onRequestDelete}/>
              )
            })
          }
        </Row>
        <div>
          <h4>
            Total to pay: <b>{totalToPay}</b>
          </h4>
        </div>
        {summaryButton}
      </React.Fragment>
    )
  }
}
