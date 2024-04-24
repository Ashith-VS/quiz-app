import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import menuIcon from "../assets/image/menu_icon.png";
import profileIcon from "../assets/image/profile_icon.png";
import { auth, db } from "../services/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.Reducers);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mystorage, setMyStorage] = useState([]);

  useEffect(() => {
    const getDoc = async () => {
      const querySnapshot = await getDocs(collection(db, "user"));
      const dataStore = [];
      querySnapshot.forEach((doc) => {
        dataStore.push(doc.data());

        const update = dataStore.find(
          (item) => item?.email === currentUser?.email
        );
        setMyStorage(update);
      });
    };
    getDoc();
  }, []);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar navbar-light bg-light ">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        {" "}
        <span className="navbar-brand p-4">Quiz App</span>
      </Link>
      <div className="ml-auto">
        <div className="dropdown mx-5">
          <Link to={"/"}>
            <img src={profileIcon} alt="" className="img" />
          </Link>
          <span>{mystorage?.name}</span>

          <img
            src={menuIcon}
            alt=""
            className="img"
            onClick={handleDropdown}
            style={{ cursor: "pointer" }}
          />
          {showDropdown && (
            <div className="dropdown-menu dropdown-menu-right show">
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </button>
              <button
                className="dropdown-item select"
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  signOut(auth);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
