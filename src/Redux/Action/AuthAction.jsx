import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  AUTH_CREATE_FAILURE,
  AUTH_CREATE_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  CURRENT_USER_DATA,
} from "../constant";
import { auth } from "../../services/firebase";


export const CreateUserAuth = (formData, navigate) => {
  return async (dispatch) => {
      await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ) 
      .then((res) => {
        dispatch({ type: AUTH_CREATE_SUCCESS, payload: res });
        navigate("/login");
      })
      .catch((error) => {
        dispatch({ type: AUTH_CREATE_FAILURE, payload: error.code });
      });
  };
};

export const LoggedUserAuth = (formData, navigate) => {
  return async (dispatch) => {
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: AUTH_LOGIN_FAILURE, payload: error.code });
      });
  };
};

export const CurrentUserAuth = (response) => {
  localStorage.setItem("currentUser", JSON.stringify(response));
  return {
    type: CURRENT_USER_DATA,
    payload: response,
  };
};


   

