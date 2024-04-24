import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useSelector } from "react-redux";

const QuizPage = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    multiple0: "",
    multiple1: "",
    multiple2: "",
    multiple3: "",
    multiple4: "",
    multiple5: "",
    multiple6: "",
    multiple7: "",
    multiple8: "",
    multiple9: "",
    multiple10: "",
  });

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  const formattTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Pad seconds with a leading zero if it's less than 10
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${paddedSeconds}`;
  };

  const handleInputChange = (e) => {
    const { name, id } = e.target;
    setFormData({ ...formData, [name]: id });
  };

  const handleScore = async (newScore) => {
    // let id = Date.now().toString();
    try {
      const res = await getDocs(collection(db, "user"));
      const data = [];
      res.forEach((doc) => {
        data.push(doc.data());
      });
      let filtered = data.find((item) => item.email === currentUser.email);

      if (filtered) {
        const formattedDate = formatDate(new Date());
        const times = 120 - timer;
        const formattedTime = formattTime(times);
        const newScores = [
          ...filtered.score,
          {
            score: newScore,
            date: formattedDate,
            time: formattedTime,
          },
        ];
        await updateDoc(doc(db, "user", filtered.id), {
          ...filtered,
          score: newScores,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    let newScore = score;
    apiData?.forEach((question, i) => {
      const selectedOption = formData[`multiple${i}`];
      if (selectedOption === question.correct_answer) {
        newScore++;
      }
    });

    setScore(newScore);
    setTimerRunning(false);
    setModal(!modal);
    handleScore(newScore);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
      );
      const data = await res.json();
      setApiData(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData().then(() => setTimerRunning(true));
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    setTimer(time);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleClose = () => {
    setModal(!modal);
    setTimerRunning(true);
    setScore(0);
  };

  return (
    <form className="container d-flex justify-content-center align-items-center mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-10 col-lg-10">
          <div className="border">
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>Quiz App</h4>
                <CountdownCircleTimer
                  isPlaying={timerRunning}
                  duration={120}
                  colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                  size={100}
                  strokeWidth={6}
                >
                  {({ remainingTime }) => (
                    <div className="timer">
                      <div className="value">{formatTime(remainingTime)}</div>
                    </div>
                  )}
                </CountdownCircleTimer>
              </div>
            </div>
            <div className="question bg-white p-3 border-bottom">
              {apiData?.map((item, i) => {
                const allAnswer = [
                  ...item.incorrect_answers,
                  item.correct_answer,
                ];

                return (
                  <div className=" flex-row align-items-center  m-2" key={i}>
                    <h5 className="mt-1 ml-2">
                      <span className="text-danger">{i + 1}.</span>{" "}
                      {item.question}
                    </h5>

                    <div className="d-flex ">
                      {allAnswer?.map((state, index) => (
                        <label className="radio m-2" key={index}>
                          <input
                            type="radio"
                            name={`multiple${i}`}
                            id={state}
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">{state}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" d-flex justify-content-end align-items-center p-3 bg-white">
              <button
                className="btn btn-primary border-success align-items-center btn-success"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <Modal isOpen={modal} style={customStyles}>
              <div className="result">The result is ({score}/10)</div>
              <div className="modal-footer mt-3">
                <button
                  className="btn blue pull-right "
                  onClick={() => handleClose()}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Rematch
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuizPage;
