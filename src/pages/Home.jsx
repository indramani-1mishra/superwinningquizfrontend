import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/otp/login"); // Navigate to OTP login
  };
 const ismobile =window.innerWidth<730;
  return (
    <div className={`${ismobile?"flex flex-col items-center text-white px-4  text-center  relative top-[140px] h-[100vh]":"flex flex-col items-center justify-center  min-h-100vh text-center text-white opacity-75 px-4"}`}>
      {/* min-h-[calc(100vh-64px)] ensures it fills screen minus header height (64px) */}

      <div className="space-y-4 "> {/* vertical spacing between texts */}
        <h3 className="text-4xl md:text-xl lg:text-6xl">
          <span>EXPLORE & WIN</span>
        </h3>
        <h3 className="text-lg md:text-xl lg:text-2xl">THE NEW WORLD OF</h3>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">SUPERWINNINGS!!</h1>
      </div>

      <button
        className="glow-on-hover mt-6 px-6 py-2 bg-yellow-500 rounded-lg text-white font-semibold hover:bg-yellow-400 transition"
        type="button"
        onClick={handleLoginClick}
      >
        PLEASE LOGIN TO PROCEED
      </button>
    </div>
  );
}

export default Home;