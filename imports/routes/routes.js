import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory({
    forceRefresh: true
})

import Login from '../ui/login'
import Signup from '../ui/signup'
import Link from '../ui/link'
import NotFound from '../ui/not-found'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

export const onAuthChange = (isAuthenticated) => {
  const pathname = window.location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if(isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links')
  } else if(isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
  }
}

export const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/links" component={Link} />
      <Route path="/signup" component={Signup}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)
