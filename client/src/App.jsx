import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice.js";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.user.userData);

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
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#f3f3f3]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" />} />
      <Route path="/auth" element={userData ? <Navigate to="/" /> : <Auth />} />
      <Route path="*" element={<Navigate to={userData ? "/" : "/auth"} />} />
    </Routes>
  );
};

export default App;
