import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import  combineReducers  from "./Reducer/index";
const middleware = applyMiddleware(thunk);
const configureStore = (state) => {
  return createStore(combineReducers, state, middleware);
};
export default configureStore;