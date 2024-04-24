import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  const [mystorage, setMyStorage] = useState([]);

  useEffect(() => {
    const getDoc = async () => {
      const querySnapshot = await getDocs(collection(db, "user"));
      const dataStore = [];
      querySnapshot.forEach((doc) => {
        dataStore.push(doc.data());
        // console.log(dataStore)
        const update = dataStore.find(
          (item) => item.email === currentUser.email
        );
        setMyStorage(update);
      });
    };
    getDoc();
  }, []);

  return (
    <div>
      <Header />
      <div className="container text-center pb-4 col-sm-6">
        <h1 className="my-4">Dashboard</h1>
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Scores</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          {mystorage?.score?.map((item, i) => (
            <tbody key={i}>
              <td>{i + 1}</td>
              <td>{item.score}</td>
              <td>{item.time}</td>
              <td>{item.date}</td>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
