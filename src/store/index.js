import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { getTokens } from "@/utils/storage";
const store = createStore(
  reducer,
  { login: getTokens() },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
