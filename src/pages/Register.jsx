import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserAuth } from "../Redux/Action/AuthAction";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const Register = () => {
  const { AuthFailure } = useSelector((state) => state.Reducers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, SetFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetFormdata({ ...formdata, [name]: value });
  };
  const [mystorage, setMyStorage] = useState([]);

  useEffect(() => {
    const getDoc = async () => {
      const querySnapshot = await getDocs(collection(db, "user"));
      const dataStore = [];
      querySnapshot.forEach((doc) => {
        dataStore.push(doc.data());
        setMyStorage(dataStore);
      });
    };
    getDoc();
  }, []);

  const handleUpdate = async () => {
    let id = Date.now().toString();

    try {
      mystorage.every((item) => item.email !== formdata.email) &&
        (await setDoc(doc(db, "user", id), {
          ...formdata,
          id: id,
          score: [],
        }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateUserAuth(formdata, navigate));
    handleUpdate();
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    onChange={handleInputChange}
                    value={formdata?.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={formdata?.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={formdata?.password}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                {AuthFailure && (
                  <span style={{ color: "red" }}>{`Error ${AuthFailure}`}</span>
                )}
              </form>
              <p className="mt-3">
                You already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
