import Cookies from "js-cookie"
import JWTDecode from "jwt-decode"
import { NewHtmlRequest, NewRequest, URLForEndpoint } from "./requests"

const ERROR_INVALID_RESPONSE = {
  type:    "invalid_response",
  message: "Couldn't understand server response.",
}

const ERROR_SERVER_UNREACHABLE = {
  type:    "could_not_contact_server",
  message: "Couldn't contact the server. Please check your internet connection and try again.",
}

const ERROR_ACCESS_DENIED = {
  type:    "unauthorized",
  message: "Access is denied",
}

export default class DataSource {
  static get shared() {
    if (DataSource.instance == null || DataSource.instance === undefined) {
      DataSource.instance = new DataSource()
      let token = Cookies.get("token")
      if (token !== undefined && token !== "null") {
        try {
          DataSource.instance._claims = JWTDecode(token)
          DataSource.instance.token = token
        }
        catch (err) {
          console.error("Couldn't decrypt token: ", err)
        }
      }
    }
    return DataSource.instance
  }

  constructor() {
    this.token = null
    this._claims = null
  }

  async parseResponseAndHandleErrors(response) {
    // If not successful, throw JSON as response
    let responseStatusNumber = Number(response.status)
    if (responseStatusNumber >= 400 && responseStatusNumber <= 599) {
      throw await response.json()
    }

    // Parse response
    let json
    try {
      json = await response.json()
    } catch (err) {
      throw ERROR_INVALID_RESPONSE
    }

    // Handle empty JSON with prejudice
    if (json === null || json === undefined) {
      throw ERROR_INVALID_RESPONSE
    }

    return json
  }

  async handleErrors(response) {
    // Check if unauthorized
    if (response.status === "401") {
      // Log out
      this.logout()
      throw ERROR_ACCESS_DENIED
    }

    // If not successful, throw response
    let responseStatusNumber = Number(response.status)
    if (responseStatusNumber >= 400 && responseStatusNumber <= 599) {
      let json
      try {
        json = await response.json()
      } catch (err) {
        // do nothing
      }

      if (json === null || json === undefined) {
        throw response
      } else {
        throw json
      }
    }

    return response
  }

  async signup(username, password, confirmPassword) {
    // Build request
    const url = URLForEndpoint(`user/add`)
    const request = NewRequest("POST")
    request.body = JSON.stringify({
      username,
      password,
      confirmPassword,
    })

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    return await this.parseResponseAndHandleErrors(response)
  }

  async login(username, password) {
    // Build request
    const url = URLForEndpoint("login")
    const request = NewRequest("POST")
    request.body = JSON.stringify({
      username: username,
      password: password,
    })

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    const json = await this.parseResponseAndHandleErrors(response)

    // Store token
    Cookies.set("token", json.token, { expires: 365 })
    this.token = json.token
    window.location.reload()
  }

  get claims() {
    if (this._claims == null) {
      try {
        this._claims = JWTDecode(this.token)
      }
      catch (err) {
        console.error("Couldn't decrypt token: ", err)
      }
    }
    return this._claims
  }

  get isLoggedIn() {
    return this.token != null
  }

  logout() {
    Cookies.set("token", null)
    this.token = null
    this._claims = null
    window.location.reload()
  }

  async getProfile() {
    // Build request
    const url = URLForEndpoint("profile")
    const request = NewRequest("GET", this.token)

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    return await this.parseResponseAndHandleErrors(response)
  }

  async getUsers() {
    // Build request
    const url = URLForEndpoint("users")
    const request = NewRequest("GET", this.token)

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    return await this.parseResponseAndHandleErrors(response)
  }

  async getBossMessage() {
    // Build request
    const url = URLForEndpoint("boss")
    const request = NewRequest("GET", this.token)

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    return await this.parseResponseAndHandleErrors(response)
  }

  async getOrders() {
    // Build request
    const url = URLForEndpoint("orders")
    const request = NewRequest("GET", this.token)

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    return await this.parseResponseAndHandleErrors(response)
  }

  async postOrder(row) {
    console.log(row)
    // Build request
    const url = URLForEndpoint(`orders/add`)
    const request = NewRequest("POST")
    request.body = JSON.stringify({
      name:        row.name,
      vendor:      row.vendor,
      foodNumbers: row.foodNumbers,
      totalAmount: row.totalAmount,
      status:      "unpaid",
    })

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    return await this.parseResponseAndHandleErrors(response)
  }

  async deleteRequest(requestOrder) {
    console.log(requestOrder)
    // Build request
    const url = URLForEndpoint(`request/${requestOrder._id}`)
    const request = NewRequest("DELETE", this.token)
    request.body = JSON.stringify({
      totalAmount: requestOrder.totalAmount / 100, //TODO: do at backend
      orderID:     requestOrder.order_id,
    })

    // Fetch
    let response
    try {
      response = await fetch(url, request)
    } catch (err) {
      throw ERROR_SERVER_UNREACHABLE
    }

    // Handle errors and return response
    return await this.handleErrors(response)
  }

}
