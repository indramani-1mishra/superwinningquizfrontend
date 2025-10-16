import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Question() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
const isMobile = window.innerWidth < 640;
  useEffect(() => {
    const allQuestions = [
      { text: "South Africa is also known as the?", options: ["Rainbow Nation", "Land of Rising Sun", "Emerald Isle", "Great White North"], correctIndex: 0 },
      { text: "Which city is the legislative capital of South Africa?", options: ["Pretoria", "Cape Town", "Durban", "Johannesburg"], correctIndex: 1 },
      { text: "What is the currency of South Africa?", options: ["Rand", "Dollar", "Shilling", "Pound"], correctIndex: 0 },
      { text: "Who was the first black President of South Africa?", options: ["Nelson Mandela", "Desmond Tutu", "Thabo Mbeki", "Jacob Zuma"], correctIndex: 0 },
      { text: "Which natural wonder is on the border of South Africa and Zimbabwe?", options: ["Victoria Falls", "Niagara Falls", "Iguazu Falls", "Angel Falls"], correctIndex: 0 },
      { text: "Which ocean lies to the east of South Africa?", options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"], correctIndex: 2 },
      { text: "Which sport is extremely popular and South Africa won the 1995 World Cup in it?", options: ["Football", "Cricket", "Rugby", "Hockey"], correctIndex: 2 },
      { text: "Table Mountain overlooks which South African city?", options: ["Cape Town", "Durban", "Pretoria", "Bloemfontein"], correctIndex: 0 },
      { text: "Which desert is partly located in South Africa?", options: ["Sahara", "Kalahari", "Namib", "Gobi"], correctIndex: 1 },
      { text: "South Africa is the world’s largest producer of which metal?", options: ["Gold", "Silver", "Platinum", "Copper"], correctIndex: 2 },
    ];
    setQuestions(allQuestions);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;
    setTimer(15);

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          nextQuestion(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [index, questions]);

  const handleAnswer = (opt, i) => {
    if (selected !== null) return;
    setSelected(i);
    const correctAnswerIndex = questions[index].correctIndex;
    if (i === correctAnswerIndex) setScore((s) => s + 1);
    setTimeout(() => nextQuestion(false), 800);
  };

  const nextQuestion = (manualClick = true) => {
    if (manualClick && selected !== null) {
      const correctAnswerIndex = questions[index].correctIndex;
      if (selected === correctAnswerIndex) setScore((s) => s + 1);
    }

    const nextIndex = index + 1;
    if (nextIndex > 0 && nextIndex % 5 === 0) {
      navigate("/purchase/plan");
      return;
    }

    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      setSelected(null);
    } else {
      alert(`🎉 Quiz Finished! Your Score: ${score}/${questions.length}`);
    }
  };

  if (loading) return <p className="text-white">Loading quiz...</p>;
  if (questions.length === 0) return <p className="text-red-500">❌ No quiz available</p>;

  const q = questions[index];

  return (
    <div className={`question-box relative  ${isMobile ? " relative top-[-80px]" : " relative top-[-50px]"
              }`} >
      {/* SCORE */}
      <div className="w-full flex justify-center mb-2 sm:hidden relative top-6">
        <p className="font-bold text-right font-semibold relative top-[53px] w-full ">Score: {score}</p>
      </div>

      <div className="hidden sm:flex fixed top-4 right-4 flex-col items-center justify-center text-white text-[60px] px-4 py-2 z-50 text-center">
        <p className="font-semibold border-4 border-green-800 relative top-[140px] shadow-[0px_0px_5px_5px_white] rounded-md p-2">Score: {score}</p>
      </div>

      {/* QUIZ BOX */}
      <div className="wrap max-w-full mb-2 md:max-w-3xl  relative">
        <div className="count mb-4 text-center">
          <span style={{ color: timer <= 5 ? "red" : "white" }}>{timer}</span>
        </div>

        <div className="border mb-4 sm:mb-2">
          <div className={`${
              isMobile ? "question gradient-border" : "question gradient-border"
              }`}>
            <div>{index + 1}. {q.text}</div>
          </div>
        </div>

        <ul className={` ${
              isMobile ? "" : "flex flex-wrap justify-center gap-6  p-4  top-[200px]"
              }`}>
          {q.options.map((opt, i) => {
            const correctIndex = q.correctIndex;
            let bgColor = "#170324";
            if (selected !== null) {
              if (i === correctIndex) bgColor = "green";
              else if (i === selected) bgColor = "red";
            }
            return (
              <li
                key={i}
                className={` ${
              isMobile ? "mb-1 sm:mb-2 w-full sm:w-auto relative sm:left-0 left-[-15px]" : "w-[42%]  text-white text-center p-2 rounded"
              }`}
              >
                <label
                  onClick={() => handleAnswer(opt, i)}
                  style={{
                    background: bgColor,
                    color: "white",
                    borderRadius: window.innerWidth < 640 ? "10px" : "999px",
                    padding: "10px 14px",
                    width: window.innerWidth < 640 ? "100%" : "auto",
                    cursor: selected !== null ? "not-allowed" : "pointer",
                    border: "2px solid rgba(255,255,255,0.2)",
                    boxShadow: window.innerWidth < 640 ? "0px 0px 2px 2px white" : "none",
                    transition: "all 0.3s ease-in-out",
                    opacity: selected !== null && i !== selected && i !== correctIndex ? 0.6 : 1,
                  }}
                >
                  {opt}
                </label>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => nextQuestion(true)}
          className="glow-on-hover mt-4 mb-2 px-6 py-3 w-[90%] sm:w-auto mx-auto"
        >
          {index + 1 === questions.length ? "FINISH" : "NEXT"}
        </button>
      </div>
    </div>
  );
}

export default Question;
