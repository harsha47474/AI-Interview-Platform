import React, { useState } from 'react'
import { motion } from "motion/react";
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { FaUserAstronaut } from "react-icons/fa"
import { BsRobot, BsCoin } from "react-icons/bs"
import { HiOutlineLogout } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Navbar = () => {
    const userData = useSelector((state) => state.user.userData);
    const [showCreditPopup, setShowCreditPopup] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000" + '/api/auth/logout', { withCredentials: true });
            dispatch(setUserData(null));
            setShowUserPopup(false);
            setShowCreditPopup(false);
            navigate('/auth');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm
            border border-gray-200 px-8 py-4 flex justify-between items-center 
            relative'>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <BsRobot size={18} />
                    </div>
                    <h1 className='font-semibold hidden md:block
                    text-lg'>Colloquium</h1>
                </div>
                <div className="flex items-center gap-6 relative">
                    <div className='relative'>
                        <button onClick={() => {
                            setShowCreditPopup(!showCreditPopup);
                            setShowUserPopup(false)
                        }} className='flex items-center gap-2 bg-gray-100
                        px-4 py-2 rounded-full text-md hover:bg-gray-200
                        transition'>
                            <BsCoin size={20} />
                            {userData?.credits || 0}
                        </button>

                        {showCreditPopup && (
                            <div className="absolute right-[-50px] mt-3 w-64
                            bg-white shadow-xl border border-gray-200 rounded-xl
                            p-5 z-50">
                                <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                                <button onClick={() => navigate('/pricing')} className="w-full bg-black text-white
                                py-2 rounded-lg text-sm">
                                    Buy more credits
                                </button>
                            </div>
                        )}
                    </div>

                    <div className='relative'>
                        <button
                            onClick={() => {
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }}
                            className='w-9 h-9 bg-black text-white
                        rounded-full flex items-center justify-center font-semibold'>
                            {userData ? userData?.name.slice(0, 1).toUpperCase() :
                                <FaUserAstronaut size={18} />}
                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl
                            border border-gray-200 rounded-xl p-4 z-50'>
                                <p className='text-sm text-gray-600 mb-4'>Signed in as <span className='font-semibold'>{userData?.name}</span></p>
                                <button onClick={() => navigate('/history')} className='w-full text-sm bg-gray-100 text-black rounded-lg
                            py-2 hover:text-black transition'>
                                    Interview History
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className='w-full text-sm py-2
                                gap-2 bg-red-500 rounded-lg mt-2 text-white'>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default Navbar