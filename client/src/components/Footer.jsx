import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-xl font-bold text-green-500">
          Colloquium
        </h2>

        <p className="text-sm text-gray-400">
          AI-powered smart interviews for better preparation.
        </p>

        <p className="text-xs text-gray-500 mt-3">
          © 2026 Colloquium. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;