import React from "react";
import { redirect, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000" + "/api/user/current-user",
          {
            withCredentials: true,
          },
        );
        dispatch(setUserData(response.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };

    getUser();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
