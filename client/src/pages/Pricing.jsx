import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingHeader from "../components/pricing/PricingHeader";
import PricingCard from "../components/pricing/PricingCard";
import PricingFeaturesBanner from "../components/pricing/PricingFeaturesBanner";
import FakePaymentGatewayModal from "../components/pricing/FakePaymentGatewayModal";
import { PRICING_PLANS } from "../utils/pricingData";

/**
 * Pricing - Subscription & interview credits purchase page with simulated payment gateway
 */
export default function Pricing() {
  const userData = useSelector((state) => state.user?.userData);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Header section with current credits */}
          <PricingHeader currentCredits={userData?.credits || 0} />

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PRICING_PLANS.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                index={index}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>

          {/* Trust and Feature Guarantees */}
          <PricingFeaturesBanner />
        </main>
      </div>

      {/* Fake Payment Gateway Modal */}
      <FakePaymentGatewayModal
        plan={selectedPlan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  );
}
