import React from "react"
import { Row, Col } from "react-bootstrap"
import DataSource from "../data/datasource"

export default class OrderListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: null,
    }
  }

  async fetchData() {
    const orderList = await DataSource.shared.getOrders()
    this.setState({
      orderList,
    })
  }

  async componentDidMount() {
    await this.fetchData()
  }

  render() {
    const { orderList } = this.state
    if (!orderList) return null
    const { orders, totalToPay } = orderList
    const ordersNode = orders.map(order => {
      return (
        <Col sm={3}>
          <div key={order._id} style={{ marginBottom: 20, border: "1px solid #8e8e8e", padding: 10 }}>
            <div>
              name: <b>{order.name}</b>
            </div>
            <div>
              foodNumbers: <b>{order.foodNumbers}</b>
            </div>
            <div>
              amount: <b>RM{order.totalAmount}</b>
            </div>
          </div>
        </Col>
      )
    })

    return (
      <div>
        <h3>Food Ordered List</h3>
        <Row>
          {ordersNode}
        </Row>
        <div>
          <h4>
            Total to pay: <b>{totalToPay}</b>
          </h4>
        </div>
      </div>
    )
  }
}