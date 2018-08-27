import React from "react"
import moment from "moment"

export default class OrderSummary extends React.Component {
  render() {
    const { orders, totalToPay, date } = this.props
    const dateFormatted = moment(date).format("DD MMM YYYY")

    return (
      <div>
        Date: {dateFormatted}<br/>
        Address:Tower B,Avenue 10<br/>
        Contact no : 018 3111 701<br/>
        Order:<br/>
        {
          orders.map((order, index) => {
            const totalAmount = order.totalAmount / 100 //TODO: cal at backend
            return (
              <div key={order._id}>
                {index + 1}. {order.name} {order.foodNumbers} RM{totalAmount}
              </div>
            )
          })
        }
        <br/>
        Total : RM{totalToPay}
      </div>
    )
  }
}