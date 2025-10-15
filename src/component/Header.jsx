import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from '../assets/image1.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    setShowLogoutModal(false);
    setMenuOpen(false);
  };

  const showLeaderboard = isLoggedIn;

  return (
    <header className="bg-black text-white relative">
      {/* Marquee / Top Banner */}
      <div className="w-full bg-yellow-400 text-black font-bold py-2 overflow-hidden relative">

        <marquee direction="left" behavior="alternate" scrollamount="8" loop="10">
          WIN 100 K SZL & BE A SUPERWINNER &nbsp; &nbsp; WIN 100 K SZL & BE A SUPERWINNER
        </marquee>

      </div>

      {/* Main Header */}
      <div className="container m-0 p-0 mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center no-underline text-white"
          onClick={() => setMenuOpen(false)}
        >
          {/* Bigger Logo */}
          <img src={Logo} alt="logo" className="h-16 w-auto mr-4" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {showLeaderboard && (
            <li>
              <Link to="/leaderboard" className="text-white no-underline hover:text-yellow-400">
                LEADERBOARD
              </Link>
            </li>
          )}
          <li>
            <Link to="/product" className="text-white no-underline hover:text-yellow-400">
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link to="/support" className="text-white no-underline hover:text-yellow-400">
              SUPPORT
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-white border border-black rounded px-3 py-1
                           hover:bg-red-600 hover:text-white hover:border-white transition"
              >
                LOGOUT
              </button>
            ) : (
              <Link to="/otp/login" className="text-white no-underline hover:text-yellow-400">
                LOGIN
              </Link>
            )}
          </li>
        </ul>

        {/* Hamburger - Mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="material-symbols-outlined text-white">menu</span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-60" : "max-h-0"
          }`}
      >
        <ul className="flex flex-col gap-4 mt-2 pb-4">
          {showLeaderboard && (
            <li>
              <Link
                to="/leaderboard"
                className="text-white no-underline hover:text-yellow-400"
                onClick={() => setMenuOpen(false)}
              >
                LEADERBOARD
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/product"
              className="text-white no-underline hover:text-yellow-400"
              onClick={() => setMenuOpen(false)}
            >
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className="text-white no-underline hover:text-yellow-400"
              onClick={() => setMenuOpen(false)}
            >
              SUPPORT
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-white border border-black rounded py-1
                           hover:bg-red-600 hover:text-white hover:border-white transition"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                to="/otp/login"
                className="text-white no-underline hover:text-yellow-400"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-80 max-w-[90%] h-[150px] text-center flex flex-col justify-center">
            <p className="text-black text-normal mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
