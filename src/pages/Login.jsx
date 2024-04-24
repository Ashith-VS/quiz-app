import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoggedUserAuth } from "../Redux/Action/AuthAction";

const Login = () => {
  const { LoginFailure } = useSelector((state) => state.Reducers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata, SetFormdata] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetFormdata({ ...formdata, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoggedUserAuth(formdata, navigate));
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <form
                onSubmit={handleSubmit}
                className="formData"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formdata?.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formdata?.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </form>
              {LoginFailure && (
                <span style={{ color: "red" }}>{`Error ${LoginFailure}`}</span>
              )}

              <p className="mt-3">
                You don't have an account?{" "}
                <Link to={"/register"}>Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
