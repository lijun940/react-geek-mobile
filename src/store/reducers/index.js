const { combineReducers } = require("redux");
function test(state = 0, action) {
  return state
}
function use(state = {nameL:'zs'},action) {
  return state
}
const reducer = combineReducers({
  test,
  use
})

export default reducer