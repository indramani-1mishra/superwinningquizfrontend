import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Trophy, Box, LifeBuoy, LogOut, User } from "lucide-react";
import Logo from '../assets/image1.png';
import {  XCircle } from "lucide-react";
import './Header.css';
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
    <header className="relative z-50">
            <div className="w-full bg-yellow-400 text-black font-bold py-2 overflow-hidden relative">

        <marquee direction="left" behavior="alternate" scrollamount="8" loop="10">
          WIN 100 K SZL & BE A SUPERWINNER &nbsp; &nbsp; WIN 100 K SZL & BE A SUPERWINNER
        </marquee>

      </div>

      
        
      {/* Main Header */}
      <div className="bg-black text-white flex items-center justify-between px-4 md:px-8 py-3 shadow-lg">

        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <img src={Logo} alt="logo" className="h-16 w-auto mr-3" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-lg font-semibold">
          {showLeaderboard && (
            <li className="relative group flex items-center gap-1">
              <Trophy size={18} /> 
              <Link 
                to="/leaderboard"
                className="text-white group-hover:text-blue-500 transition-colors duration-300"
              >
                LEADERBOARD
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}
          <li className="relative group flex items-center gap-1">
            <Box size={18} /> 
            <Link 
              to="/product"
              className="text-white group-hover:text-blue-500 transition-colors duration-300"
            >
              PRODUCTS
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li className="relative group flex items-center gap-1">
            <LifeBuoy size={18} /> 
            <Link 
              to="/support"
              className="text-white group-hover:text-blue-500 transition-colors duration-300"
            >
              SUPPORT
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-1 px-4 py-1 border border-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                <LogOut size={16} /> LOGOUT
              </button>
            ) : (
              <Link
                to="/otp/login"
                className="flex items-center gap-1 text-white"
              >
                <User size={16} /> LOGIN
              </Link>
            )}
          </li>
        </ul>

        {/* Hamburger - Mobile */}
        <button
          className="md:hidden p-2 focus:outline-none transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} className="animate-spin"/> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col gap-4 mt-4 pb-4 px-4">
          {showLeaderboard && (
            <li className="relative group flex items-center gap-2">
              <Trophy size={18} className="text-white" />
              <Link 
                to="/leaderboard" 
                onClick={() => setMenuOpen(false)}
                className="text-white group-hover:text-blue-500 transition-colors duration-300"
              >
                LEADERBOARD
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          )}
          <li className="relative group flex items-center gap-2">
            <Box size={18} color="white" /> 
            <Link 
              to="/product" 
              onClick={() => setMenuOpen(false)}
              className="text-white group-hover:text-blue-500 transition-colors duration-300"
            >
              PRODUCTS
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li className="relative group flex items-center gap-2">
            <LifeBuoy size={18}  color="white"/> 
            <Link 
              to="/support" 
              onClick={() => setMenuOpen(false)}
              className="text-white group-hover:text-blue-500 transition-colors duration-300"
            >
              SUPPORT
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-1 w-full justify-center py-2 border border-white rounded-lg bg-white text-black hover:bg-gray-100 transition-all duration-300"
              >
                <LogOut size={16} /> LOGOUT
              </button>
            ) : (
              <Link
                to="/otp/login"
                className="flex items-center gap-1 w-full justify-center py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <User size={16} /> LOGIN
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
   <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn p-4">
  <div className="relative bg-white rounded-lg shadow-[0px_0px_5px_3px_red] w-full max-w-sm md:max-w-md h-[200px] text-center border border-gray-200 flex flex-col items-center p-6 md:p-8  flex justify-center flex-cols items-center">

    {/* Power Icon */}
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
      <div className="bg-red-600 w-14 h-14 flex justify-center items-center rounded-full shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M5.64 5.64A9 9 0 1018.36 18.36 9 9 0 005.64 5.64z" />
        </svg>
      </div>
    </div>

    {/* Title & Message */}
    <div className="mt-6 md:mt-8 text-center">
      <h2 className="text-lg md:text-xl font-bold text-gray-800">Logout Account</h2>
      <p className="text-gray-600 mt-2 text-sm md:text-base p-1  capitalize"  style={{ textShadow: "0px 0px 4px rgba(0,0,0,0.5)" }}>
        Are you sure you want to logout?
      </p>
    </div>

    {/* Buttons */}
    <div className="mt-6 flex flex-col md:flex-row gap-3 w-full">
      <button
        onClick={() => setShowLogoutModal(false)}
        className="flex-1 bg-green-100 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-green-200 transition-all duration-300"
      >
        Cancel
      </button>
      <button
        onClick={handleLogout}
        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-all duration-300"
      >
        Yes, Logout!
      </button>
    </div>
  </div>
</div>

        
      )}
    </header>
  );
}
