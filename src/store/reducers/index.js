import login from './login.js'
import profile from './profile.js'
import home from './home.js'
const { combineReducers } = require('redux')
const reducer = combineReducers({
  login,
  profile,
  home
})

export default reducer
