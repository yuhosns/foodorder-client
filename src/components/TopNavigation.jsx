import React from "react"
import { Grid, Navbar, Nav, NavItem, Row, Col } from "react-bootstrap"
import UserInfo from "./UserInfo"
import DataSource from "../data/datasource"

export default class TopNavigation extends React.Component {
  render() {

    let userInfoNode
    if (DataSource.shared.isLoggedIn) {
      userInfoNode = <UserInfo/>
    } else {
      userInfoNode = (
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={6}>
                <div style={{ background: "#eee", minHeight: 80, padding: 10, border: "1px solid #8e8e8e" }}>
                  <b>To login as boss</b><br/>
                  Boss Account: boss<br/>
                  Password:123
                </div>
              </Col>
              <Col xs={6}>
                <div style={{ background: "#eee", minHeight: 80, padding: 10, border: "1px solid #8e8e8e" }}>
                  <b>To login as staff, please sign up an account</b>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    }

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Food Order</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/login">
              Login
            </NavItem>
            <NavItem eventKey={2} href="/signup">
              Sign Up
            </NavItem>
            <NavItem eventKey={3} href="/profile">
              My Profile
            </NavItem>
            <NavItem eventKey={4} href="/users">
              User List
            </NavItem>
            <NavItem eventKey={4} href="/boss-only">
              Boss Only
            </NavItem>
          </Nav>
        </Navbar>

        <Grid>
          {userInfoNode}
          <hr/>
        </Grid>
      </div>
    )
  }
}