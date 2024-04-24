import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <Header/>
    <div className="container d-flex justify-content-center align-items-center vh-70" >
      <div className="text-center">
        <h1 className="display-4">Welcome to QuizApp!</h1>
        <p className="lead">
          This is a simple quiz application. You can take a quiz and see the
          results.
        </p>   
        <button className="btn btn-primary" onClick={() => navigate("/quiz")}>
          Take Quiz
        </button>
      </div>
    </div>
    </>
  );
};

export default Home;
