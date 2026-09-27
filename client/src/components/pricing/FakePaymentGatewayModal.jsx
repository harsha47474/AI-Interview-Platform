import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaSpinner,
  FaCreditCard,
  FaQrcode,
  FaUniversity,
  FaArrowRight,
  FaMagic,
  FaCheck,
} from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const BANKS = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "sbi", name: "State Bank of India" },
  { id: "icici", name: "ICICI Bank" },
  { id: "axis", name: "Axis Bank" },
];

/**
 * FakePaymentGatewayModal - Realistic simulated payment gateway (UPI, Cards, NetBanking)
 * that credits users' accounts via the backend API upon completion.
 */
const FakePaymentGatewayModal = ({ plan, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  // Gateway state
  const [activeTab, setActiveTab] = useState("upi"); // 'upi' | 'card' | 'netbanking'
  const [status, setStatus] = useState("idle"); // 'idle' | 'processing' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [txnId, setTxnId] = useState("");
  const [newCredits, setNewCredits] = useState(0);

  // Form states
  const [upiId, setUpiId] = useState("testuser@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("888");
  const [cardName, setCardName] = useState(userData?.name || "Test Candidate");
  const [selectedBank, setSelectedBank] = useState("hdfc");

  if (!isOpen || !plan) return null;

  // Execute payment and credit addition
  const handleProcessPayment = async () => {
    setStatus("processing");
    setErrorMessage("");

    try {
      // Step 1: Simulated Gateway Processing Delay
      setStatusMessage("Connecting to secure payment gateway...");
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatusMessage("Authorizing transaction with bank...");
      await new Promise((resolve) => setTimeout(resolve, 900));

      // Step 2: Call backend to add credits to the user's account
      setStatusMessage("Crediting account balance...");
      const res = await api.post("/api/user/add-credits", {
        credits: plan.credits,
        planName: plan.name,
        amount: plan.price,
      });

      // Step 3: Update Redux store
      const updatedTotalCredits = res.data.credits;
      setNewCredits(updatedTotalCredits);
      if (userData) {
        dispatch(setUserData({ ...userData, credits: updatedTotalCredits }));
      }

      // Generate random transaction reference
      const mockRef = `TXN_CLQ_${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(mockRef);
      setStatus("success");
    } catch (err) {
      console.error("Payment error:", err);
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message ||
          "Payment processing failed. Please check backend connection and retry."
      );
    }
  };

  const handleFillTestCard = () => {
    setCardNumber("4532 8920 1029 4242");
    setCardExpiry("10/29");
    setCardCvv("777");
    setCardName(userData?.name || "Verified Candidate");
  };

  const handleClose = () => {
    setStatus("idle");
    setStatusMessage("");
    setErrorMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden relative flex flex-col"
        >
          {/* Top Brand & Sandbox Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center text-lg">
                <BsCoin />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base">
                    Colloquium Pay
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Mock Sandbox
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Safe simulated gateway • Instant credit replenishment
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={status === "processing"}
              className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer disabled:opacity-50"
            >
              <FaTimes size={15} />
            </button>
          </div>

          {/* SUCCESS VIEW */}
          {status === "success" ? (
            <div className="p-8 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl shadow-sm"
              >
                <FaCheckCircle />
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Payment Successful!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Your mock payment of <span className="font-bold text-gray-800">{plan.price}</span> has been verified.
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 text-left space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reference ID:</span>
                  <span className="font-mono font-semibold text-gray-800">{txnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan Purchased:</span>
                  <span className="font-semibold text-gray-800">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Credits Credited:</span>
                  <span className="font-bold text-green-600">+{plan.credits.toLocaleString()} Credits</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline font-medium">
                  <span className="text-gray-500">Updated Balance:</span>
                  <span className="font-extrabold text-sm text-gray-900 flex items-center gap-1">
                    <BsCoin className="text-amber-500" />
                    {newCredits.toLocaleString()} Credits
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold rounded-xl transition cursor-pointer"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate("/interview");
                  }}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Start Interview</span>
                  <FaArrowRight size={11} />
                </button>
              </div>
            </div>
          ) : status === "processing" ? (
            /* PROCESSING VIEW */
            <div className="p-12 text-center space-y-5">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-25" />
                <FaSpinner className="text-green-600 text-4xl animate-spin relative" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Authorizing Payment
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {statusMessage || "Please wait while we process your request..."}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-[11px] text-gray-500">
                <FaLock size={10} />
                <span>Simulating 256-bit bank verification</span>
              </div>
            </div>
          ) : (
            /* PAYMENT SELECTION / INPUT VIEW */
            <div className="p-6">
              {/* Order summary pill */}
              <div className="bg-green-50/70 border border-green-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 block">
                    Plan Selected
                  </span>
                  <h4 className="font-bold text-gray-900 text-base">
                    {plan.name} Package
                  </h4>
                  <span className="text-xs text-gray-500">
                    +{plan.credits.toLocaleString()} interview credits
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">Amount Due</span>
                  <span className="text-2xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Error banner if previous attempt failed */}
              {status === "error" && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl mb-5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("upi")}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    activeTab === "upi"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <FaQrcode />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("card")}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    activeTab === "card"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <FaCreditCard />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("netbanking")}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    activeTab === "netbanking"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <FaUniversity />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* TAB 1: UPI CONTENT */}
              {activeTab === "upi" && (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                    {/* Simulated QR Box */}
                    <div className="w-24 h-24 bg-white border border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center relative shadow-xs shrink-0">
                      <FaQrcode size={54} className="text-gray-800" />
                      <span className="text-[9px] font-bold text-green-600 mt-1 uppercase">
                        Scan to Pay
                      </span>
                    </div>

                    <div className="space-y-1.5 text-center sm:text-left flex-1">
                      <p className="font-semibold text-gray-800 text-xs">
                        Instant QR Simulation
                      </p>
                      <p className="text-[11px] text-gray-500 leading-snug">
                        Scan with GPay, PhonePe, or Paytm. Or use the default virtual UPI ID below.
                      </p>
                      <span className="inline-block text-[10px] text-green-700 bg-green-100 font-bold px-2 py-0.5 rounded-full">
                        Zero Gateway Surcharge
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Virtual UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full text-xs py-2.5 px-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: CARD CONTENT */}
              {activeTab === "card" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-700">
                      Card Details
                    </span>
                    <button
                      type="button"
                      onClick={handleFillTestCard}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-600 hover:text-green-700 cursor-pointer"
                    >
                      <FaMagic size={10} />
                      <span>Autofill Mock Card</span>
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full text-xs py-2.5 px-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="text-xs py-2.5 px-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 font-mono"
                    />
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      maxLength={4}
                      className="text-xs py-2.5 px-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 font-mono"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Cardholder Name"
                      className="w-full text-xs py-2.5 px-3 rounded-xl border border-gray-200 outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: NET BANKING CONTENT */}
              {activeTab === "netbanking" && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-gray-700 block">
                    Choose Bank
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {BANKS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(b.id)}
                        className={`p-3 rounded-xl border text-xs text-left font-medium transition cursor-pointer flex items-center justify-between ${
                          selectedBank === b.id
                            ? "border-green-500 bg-green-50/70 text-green-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <span>{b.name}</span>
                        {selectedBank === b.id && (
                          <FaCheck size={10} className="text-green-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust disclaimer */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <FaShieldAlt className="text-green-600" />
                  <span>256-bit Simulated Encryption</span>
                </div>
                <span>Test Mode Active</span>
              </div>

              {/* Pay Action Button */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={handleProcessPayment}
                className="w-full mt-4 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md hover:shadow-green-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {plan.price === "₹0" ? "Activate Free Trial" : `Pay ${plan.price}`}
                </span>
                <FaArrowRight size={11} />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FakePaymentGatewayModal;
