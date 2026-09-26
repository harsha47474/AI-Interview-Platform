import React, { useState } from "react";
import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { BsRobot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreditPopup from "./navbar/CreditPopup";
import UserMenuPopup from "./navbar/UserMenuPopup";

/**
 * Navbar - Navigation bar with logo, credits popover, and profile dropdown
 */
const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowUserPopup(false);
      setShowCreditPopup(false);
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative"
      >
        {/* Brand logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h1 className="font-semibold hidden md:block text-lg">Colloquium</h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-6 relative">
          <CreditPopup
            credits={userData?.credits || 0}
            isOpen={showCreditPopup}
            onToggle={() => {
              setShowCreditPopup(!showCreditPopup);
              setShowUserPopup(false);
            }}
          />

          <UserMenuPopup
            userData={userData}
            isOpen={showUserPopup}
            onToggle={() => {
              setShowUserPopup(!showUserPopup);
              setShowCreditPopup(false);
            }}
            onLogout={handleLogout}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;