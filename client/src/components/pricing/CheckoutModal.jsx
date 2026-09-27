import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimes, FaShieldAlt, FaLock } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

/**
 * CheckoutModal - Confirmation modal when selecting a credit plan
 */
const CheckoutModal = ({ plan, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const handleProceed = () => {
    if (plan.price === "₹0") {
      navigate("/interview");
      onClose();
      return;
    }
    // Simulation / Success state
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            <FaTimes size={16} />
          </button>

          {success ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl shadow-xs">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Payment Order Initiated!
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
                Thank you! Your order for {plan.name} ({plan.credits} credits) is being processed.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1 text-green-600 text-xs font-bold uppercase tracking-wider">
                <FaShieldAlt /> Secure Checkout
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {plan.name} Plan
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Review your order details before proceeding to payment.
              </p>

              {/* Order Summary Box */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Plan Tier</span>
                  <span className="font-semibold text-gray-800">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Interview Credits</span>
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <BsCoin className="text-amber-500" />
                    +{plan.credits.toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200/80 flex justify-between items-baseline">
                  <span className="font-semibold text-gray-700">Total Due</span>
                  <span className="text-2xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-6">
                <FaLock className="text-gray-400" />
                <span>Encrypted 256-bit checkout • Instant credit delivery</span>
              </div>

              {/* Proceed CTA */}
              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
              >
                {plan.price === "₹0" ? "Start Free Interview" : `Pay ${plan.price}`}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
