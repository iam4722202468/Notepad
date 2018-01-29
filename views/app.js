'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Header from './header'
import MainPage from './main-page'
import AddPage from './add-page'
import EditPage from './edit-page'
import ViewPage from './view-page'
import NoMatch from './no-match-page'

import style from './app.scss'

class App extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <Header />
        { this.props.children }
      </div>
    )
  }
}

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MainPage} />
      <Route path="view" component={ViewPage} />
      <Route path="add" component={AddPage} />
      <Route path="edit/:id" component={EditPage} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
)

ReactDOM.render(router, document.querySelector('#root'))
