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
          nextQuestion(false); // Time over, no score increment
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

  if (loading) return <p style={{ color: "white" }}>Loading quiz...</p>;
  if (questions.length === 0) return <p style={{ color: "red" }}>❌ No quiz available</p>;

  const q = questions[index];

  return (
    <div className="question-box relative pt-0 sm:px-6 md:px-8 lg:px-12 py-6 pb-32 min-h-[calc(100vh-80px)] overflow-x-hidden overflow-y-auto">
      {/* Score */}
      <div className="sm:hidden w-full flex justify-center mb-2">
        <div className="inline-block px-4 py-2 text-center">
          <p className="font-bold">Score: {score}</p>
        </div>
      </div>

      <div className="hidden sm:flex fixed top-4 right-4 flex-col items-center justify-center text-white text-[30px] px-4 py-2 max-w-max z-50 text-center">
        <p className="font-semibold">Score: {score}</p>
      </div>

      {/* Quiz */}
      <div className="wrap max-w-full mb-32 md:max-w-3xl mx-auto relative">
        <div className="count mb-4 text-center">
          <span style={{ color: timer <= 5 ? "red" : "white" }}>{timer}</span>
        </div>

        <div className="border mb-4">
          <div className="question gradient-border">
            <div>{index + 1}. {q.text}</div>
          </div>
        </div>

        <ul>
          {q.options.map((opt, i) => {
            const correctIndex = q.correctIndex;
            let bgColor = "#170324"; // default
            if (selected !== null) {
              if (i === correctIndex) bgColor = "green";       // correct answer
              else if (i === selected) bgColor = "red";        // wrong selection
            }
            return (
              <li key={i} className="mb-0 sm:mb-2">
                <label
                  onClick={() => handleAnswer(opt, i)}
                  style={{
                    background: bgColor,
                    color: "white",
                    borderRadius: "9999px",
                    padding: "10px 14px",
                    cursor: selected !== null ? "not-allowed" : "pointer",
                    border: "2px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease-in-out",
                    opacity: selected !== null && i !== selected && i !== correctIndex ? 0.6 : 1
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
          className="glow-on-hover mt-4 mb-2 px-6 py-3 w-[90%] mx-auto sm:w-auto"
        >
          {index + 1 === questions.length ? "FINISH" : "NEXT"}
        </button>
      </div>
    </div>
  );
}

export default Question;
