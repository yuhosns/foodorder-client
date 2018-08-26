import { Col, Button } from "react-bootstrap"
import React from "react"

export default class OrderHistoryItem extends React.Component {
  render() {
    const { order, onRequestDelete } = this.props
    const totalAmount = order.totalAmount / 100 //TODO: do at backend

    return (
      <Col sm={3} key={order._id}>
        <div style={{ marginBottom: 20, border: "1px solid #8e8e8e", padding: 10 }}>
          <div>
            vendor: <b>{order.vendor}</b>
          </div>
          <div>
            name: <b>{order.name}</b>
          </div>
          <div>
            foodNumbers: <b>{order.foodNumbers}</b>
          </div>
          <div>
            amount: <b>RM{totalAmount}</b>
          </div>
          <br/>
          <Button onClick={() => onRequestDelete(order)}>Delete</Button>
        </div>
      </Col>
    )
  }
}