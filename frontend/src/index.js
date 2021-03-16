import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createStore } from 'redux'
import { mainReducer } from './reducers'
import { Provider } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
const store = createStore(mainReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/:lang' children={<App />} />
          <Route path='/' children={<App />} />
          <Route path='' children={<App />} />
        </Switch>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
