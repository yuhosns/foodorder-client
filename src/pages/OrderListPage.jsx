import React from "react"
import { Row, Col } from "react-bootstrap"
import DataSource from "../data/datasource"
import AlertMessage from "../components/AlertMessage"

export default class OrderListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allOrders:    null,
      errorMessage: null,
    }
  }

  async fetchData() {
    this.mounted = true
    try {
      const allOrders = await DataSource.shared.getOrders()
      if (this.mounted) {
        this.setState({
          allOrders,
        })
      }
    } catch (errorMessage) {
      this.setState({
        errorMessage: errorMessage.type || errorMessage.message,
      })
    }

  }

  async componentDidMount() {
    await this.fetchData()
  }

  async componentWillReceiveProps(newProps) {
    console.log(newProps)
    await this.fetchData()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { allOrders, errorMessage } = this.state
    if (!allOrders || allOrders.length === 0) return <p>No orders history</p>

    let totalToPayNode = null
    let orderDateNode = null
    const ordersNode = allOrders.map(orderByDate => {

      const { orders, totalToPay, _id } = orderByDate
      totalToPayNode = totalToPay
      orderDateNode = _id
      console.log(orderByDate)

      return orders.map(order => {
        return (
          <Col sm={3} key={order._id}>
            <div style={{ marginBottom: 20, border: "1px solid #8e8e8e", padding: 10 }}>
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
    })

    return (
      <div>
        <AlertMessage errorMessage={errorMessage}/>
        <h3>Food Ordered List</h3>
        <Row>
          {ordersNode}
        </Row>
        <div>
          {orderDateNode}
          <h4>
            Total to pay: <b>{totalToPayNode}</b>
          </h4>
        </div>
      </div>
    )
  }
}
