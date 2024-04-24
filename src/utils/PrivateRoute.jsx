import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../services/firebase";
import { CurrentUserAuth } from "../Redux/Action/AuthAction";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(CurrentUserAuth(user));
    });
  }, []);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
