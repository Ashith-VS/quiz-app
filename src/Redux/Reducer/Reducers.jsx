import {
  AUTH_CREATE_FAILURE,
  AUTH_CREATE_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  CURRENT_USER_DATA,
} from "../constant";
const initialState = {

  AuthSuccess: {},
  AuthFailure: false,
  LoginSuccess: {},
  LoginFailure: false,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || []
};

export default function Reducers(state = initialState, action) {
  switch (action.type) {
    case AUTH_CREATE_SUCCESS:
      return {
        ...state,
        AuthSuccess: action.payload,
      };
    case AUTH_CREATE_FAILURE:
      return {
        ...state,
        AuthFailure: action.payload,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        LoginSuccess: action.payload,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        LoginFailure: action.payload,
      };
    case CURRENT_USER_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
}
