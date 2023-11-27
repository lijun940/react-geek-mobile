import login from './login.js'
import profile from './profile.js'
const { combineReducers } = require('redux')
const reducer = combineReducers({
  login,
  profile,
})

export default reducer
