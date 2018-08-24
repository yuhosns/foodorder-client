import React from "react"
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import TopNavigation from "./components/TopNavigation"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import "./App.css"
import LoginPage from "./pages/LoginPage"
import UsersPage from "./pages/UsersPage"
import ProfilePage from "./pages/Auth/ProfilePage"
import SignUpPage from "./pages/SignUpPage"
import BossOnlyPage from "./pages/BossOnlyPage"

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <TopNavigation/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignUpPage}/>
            <Route exact path="/profile" component={ProfilePage}/>
            <Route exact path="/users" component={UsersPage}/>
            <Route exact path="/boss-only" component={BossOnlyPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}