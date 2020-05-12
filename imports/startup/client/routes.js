import React from 'react'
import { Router, Route, Switch } from 'react-router'
import {createBrowserHistory} from 'history'

// route components
import Home from '../../ui/Home'
import Room from '../../ui/Room'
import Login from '../../ui/Login'

const browserHistory = createBrowserHistory()

export const renderRoutes = () => {
  const name = localStorage.getItem('myName');
  if(!name) return <Login />
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/room/:id" component={Room}/>
      </Switch>
    </Router>
  )
};
