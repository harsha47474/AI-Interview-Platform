import React from "react";
import { BsCoin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

/**
 * CreditPopup - Shows remaining user interview credits and purchase shortcut
 */
const CreditPopup = ({ credits = 0, isOpen, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition cursor-pointer"
      >
        <BsCoin size={20} />
        {credits}
      </button>

      {isOpen && (
        <div className="absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50">
          <p className="text-sm text-gray-600 mb-4">
            Need more credits to continue interviews?
          </p>
          <button
            type="button"
            onClick={() => navigate("/pricing")}
            className="w-full bg-black text-white py-2 rounded-lg text-sm cursor-pointer"
          >
            Buy more credits
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditPopup;
