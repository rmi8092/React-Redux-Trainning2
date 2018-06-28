import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import App from './components/App'
import Home from './components/Home'
import Form from './containers/Form'
import Results from './containers/Results'

import reducers from './reducers'

import './index.scss'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory))))

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="form" component={Form} />
        <Route path="results" component={Results} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container')
)