import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/quiz" element={<QuizPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
