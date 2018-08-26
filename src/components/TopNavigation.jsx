import React from "react"
import { Link } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
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

    let loginNav = (
      <React.Fragment>
        <LinkContainer to="/login">
          <NavItem eventKey={1}>
            Login
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/signup">
          <NavItem eventKey={2}>
            Sign Up
          </NavItem>
        </LinkContainer>
      </React.Fragment>
    )
    if (DataSource.shared.isLoggedIn) {
      loginNav = null
    }

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Food Order</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {loginNav}
            <LinkContainer to="/profile">
              <NavItem eventKey={3}>
                Profile
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/users">
              <NavItem eventKey={4}>
                User List
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/boss-only">
              <NavItem eventKey={4}>
                Boss Only
              </NavItem>
            </LinkContainer>
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
