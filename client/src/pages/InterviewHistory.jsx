import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function InterviewHistory() {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/interview/history",
                    { withCredentials: true }
                )
                setInterviews(res.data.interviews);
            } catch (error) {
                console.error("Error fetching interview history:", error);
            }
        }

        fetchInterviews();
    }, [])
    return (
        <>
            {interviews.length > 0 ? (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Interview History</h1>
                    <ul>{interviews.map((i) => {
                        return (
                            <>
                                <li key={i._id} className="mb-2">
                                    <p>{i.role}</p>
                                </li>
                                <button onClick={() => { navigate(`/report/${i._id}`) }}>Get the detail</button>
                            </>
                        );
                    })}</ul>
                </div>
            ) : (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Interview History</h1>
                    <p>No interview history found.</p>
                </div>
            )}
        </>
    )
}