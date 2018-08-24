import QueryString from "querystring"

const API_HOST = `${process.env.API_HOST}/`

function URLForEndpoint(endpoint, params = null) {
  let url = API_HOST + endpoint

  if (params !== null) {
    url += "?" + QueryString.stringify(params)
  }

  return url
}

function NewRequest(method, authToken = null) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  if (authToken !== null) {
    headers.append("Authorization", "Bearer " + authToken)
  }

  // Return fetch request body
  return {
    method,
    headers,
  }
}

function NewHtmlRequest(method, authToken = null) {
  const headers = new Headers()
  headers.append("Content-Type", "text/html")
  if (authToken !== null) {
    headers.append("Authorization", "Bearer " + authToken)
  }

  // Return fetch request body
  return {
    method,
    headers,
  }
}

export { URLForEndpoint, NewRequest, NewHtmlRequest }