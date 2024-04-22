import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const QuizPage = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [timer, setTimer] = useState(null); // 5 minutes = 300 seconds
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

  const handleInputChange = (e) => {
    const { name, id } = e.target;
    setFormData({ ...formData, [name]: id });
  };

  const handleSubmit = () => {
    apiData?.forEach((question, i) => {
      const selectedOption = formData[`multiple${i}`];

      if (selectedOption === question.correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }
    });
    setModal(!modal);
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

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-10 col-lg-10">
          <div className="border">
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>Quiz App</h4>

                <CountdownCircleTimer
                  isPlaying={timerRunning}
                  duration={300}
                  colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                  size={100}
                  strokeWidth={6}
                >
                  {({ remainingTime }) => (
                    <div className="timer">
                      <div className="text">Remaining </div>
                      <div className="value">{formatTime(remainingTime)}</div>
                    </div>
                  )}
                </CountdownCircleTimer>
              </div>
            </div>
            <div className="question bg-white p-3 border-bottom">
              {apiData?.map((item, i) => (
                <div className=" flex-row align-items-center  m-2" key={i}>
                  <h5 className="mt-1 ml-2">
                    <span className="text-danger">{i + 1}</span> {item.question}
                  </h5>
                  <div className="d-flex ">
                    {[...item.incorrect_answers, item.correct_answer]?.map(
                      (state, index) => (
                        <label className="radio m-2" key={index}>
                          <input
                            type="radio"
                            name={`multiple${i}`}
                            id={state}
                            onChange={handleInputChange}
                          />
                          <span className="ml-2">{state}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              ))}
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
                  onClick={() => setModal(!modal)}
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
    </div>
  );
};

export default QuizPage;
