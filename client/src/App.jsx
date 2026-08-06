import React from "react";
import { redirect, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000" + "/api/user/current-user",
          {
            withCredentials: true,
          },
        );

        console.log(response.data);
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    };

    getUser();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
