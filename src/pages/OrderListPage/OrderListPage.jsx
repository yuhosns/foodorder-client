import React from "react"
import { Row, Col, Tabs, Tab, Modal, Button } from "react-bootstrap"
import DataSource from "../../data/datasource"
import AlertMessage from "../../components/AlertMessage"
import moment from "moment"
import "./OrderListPage.css"
import OrderSummary from "../../components/OrderSummary"
import OrderList from "./OrderList"

export default class OrderListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ordersHistory: null,
      errorMessage:  null,
      infoMessage:   null,
      showSummary:   false,
    }
    this.handleRequestDelete = this.handleRequestDelete.bind(this)
    this.handleModalShow = this.handleModalShow.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
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
    const { ordersHistory, errorMessage, infoMessage, showSummary } = this.state
    if (!ordersHistory) return <p>Loading order history</p>
    if (ordersHistory && ordersHistory.length === 0) return <p>No orders history</p>
    const lastOrderDate = ordersHistory[0].date
    const lastDate = moment(lastOrderDate).format("DD MMM YYYY")
    const today = moment(new Date()).format("DD MMM YYYY")

    // No Food request today hint
    let noOrderTodayHint = null
    if (lastDate !== today) {
      noOrderTodayHint = (
        <div>
          <b style={{ color: "red" }}>No food request on today yet.</b>
          <hr/>
        </div>
      )
    }

    // order list
    const ordersNode = ordersHistory.map((orderHistory, index) => {
      const { orders, totalToPay, _id, date } = orderHistory

      // tab title
      let tabTitle = _id
      if (date) {
        tabTitle = moment(date).format("DD MMM YYYY")
      }

      // summary button
      let summaryButton = null
      if (today === tabTitle) {
        summaryButton = (
          <Button bsStyle="primary" onClick={this.handleModalShow}>
            View Summary
          </Button>
        )
      }

      return (
        <Tab eventKey={index} title={tabTitle} key={_id}>
          <OrderList orders={orders}
                     totalToPay={totalToPay}
                     summaryButton={summaryButton}
                     onRequestDelete={this.handleRequestDelete}/>
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
        <Modal show={showSummary === true} onHide={this.handleModalClose}>
          <Modal.Body>
            {ordersHistory && <OrderSummary orders={ordersHistory[0].orders}
                                            totalToPay={ordersHistory[0].totalToPay}
                                            date={ordersHistory[0].date}/>}
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  // handler
  async handleRequestDelete(requestOrder) {
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

  handleModalShow() {
    this.setState({
      showSummary: true,
    })
  }

  handleModalClose() {
    this.setState({
      showSummary: false,
    })
  }

}
