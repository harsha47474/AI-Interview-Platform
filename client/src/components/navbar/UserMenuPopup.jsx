import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * UserMenuPopup - Displays avatar, signed-in name, link to history, and logout trigger
 */
const UserMenuPopup = ({ userData, isOpen, onToggle, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold cursor-pointer"
      >
        {userData ? (
          userData?.name?.slice(0, 1).toUpperCase()
        ) : (
          <FaUserAstronaut size={18} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
          <p className="text-sm text-gray-600 mb-4">
            Signed in as{" "}
            <span className="font-semibold">{userData?.name}</span>
          </p>
          <button
            type="button"
            onClick={() => navigate("/history")}
            className="w-full text-sm bg-gray-100 text-black rounded-lg py-2 hover:text-black transition cursor-pointer"
          >
            Interview History
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="w-full text-sm py-2 gap-2 bg-red-500 rounded-lg mt-2 text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenuPopup;
