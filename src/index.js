import '@scss/index.scss'
import ReactDOM from 'react-dom'
import App from './App.js'
import { Suspense } from 'react'
import store from './store/index.js'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Suspense fallback>
    <Provider store={store}>
    <App/>

    </Provider>
  </Suspense>
  , document.querySelector('#root'))