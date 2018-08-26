import React from "react"
import { Row, Col, Tabs, Tab } from "react-bootstrap"
import DataSource from "../../data/datasource"
import AlertMessage from "../../components/AlertMessage"
import moment from "moment"
import OrderHistoryItem from "./OrderHistoryItem"
import "./OrderListPage.css"

export default class OrderListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ordersHistory: null,
      errorMessage:  null,
      infoMessage:   null,
    }
    this.handleRequestDelete = this.handleRequestDelete.bind(this)
  }

  async fetchData() {
    this.mounted = true
    try {
      const ordersHistory = await DataSource.shared.getOrders()
      if (this.mounted) {
        this.setState({
          ordersHistory,
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
    if (newProps.ordersChange !== this.props.ordersChange) {
      await this.fetchData()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { ordersHistory, errorMessage, infoMessage } = this.state
    if (!ordersHistory || ordersHistory.length === 0) return <p>No orders history</p>

    console.log(ordersHistory)
    const lastOrderDate = ordersHistory[0].date
    const lastDate = moment(lastOrderDate).format("DD MMM YYYY")
    const today = moment(new Date()).format("DD MMM YYYY")

    console.log(lastDate, " ", today)

    let noOrderTodayHint = null
    if (lastDate !== today) {
      noOrderTodayHint = (
        <div>
          <b style={{ color: "red" }}>No food request on today yet.</b>
          <hr/>
        </div>
      )
    }

    const ordersNode = ordersHistory.map((orderHistory, index) => {
      const { orders, totalToPay, _id, date } = orderHistory

      let tabTitle = _id
      if (date) {
        tabTitle = moment(date).format("DD MMM YYYY")
      }

      return (
        <Tab eventKey={index} title={tabTitle} key={_id}>
          <Row>
            {
              orders.map(order => {
                return (
                  <OrderHistoryItem order={order} key={order._id} onRequestDelete={this.handleRequestDelete}/>
                )
              })
            }
          </Row>
          <div>
            <h4>
              Total to pay: <b>{totalToPay}</b>
            </h4>
          </div>
        </Tab>
      )
    })

    return (
      <div>
        <AlertMessage errorMessage={errorMessage} infoMessage={infoMessage}/>
        <h3>Food Ordered List</h3>
        {noOrderTodayHint}
        <Tabs defaultActiveKey={0} id="orders-history">
          {ordersNode}
        </Tabs>
      </div>
    )
  }

  async handleRequestDelete(requestOrder) {
    console.log(requestOrder)
    try {
      await DataSource.shared.deleteRequest(requestOrder)
      this.setState({
        infoMessage: "Request Deleted",
      })
      setTimeout(() => {
          this.setState({
            infoMessage: null,
          })
        }, 3000,
      )
      await this.fetchData()
    } catch (err) {
      this.setState({
        errorMessage: err.type,
      })
    }
  }
}
