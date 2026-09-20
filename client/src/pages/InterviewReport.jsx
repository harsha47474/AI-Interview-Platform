import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function InterviewReport() {
    const [reportData, setReportData] = useState(null);
    const { interviewId } = useParams();

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/interview/report/${interviewId}`, {
                    withCredentials: true
                });
                const data = response.data;
                setReportData(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching interview report:", error);
            }
        }

        fetchReportData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Interview Report</h1>
            <p>This is the interview report page.</p>
        </div>
    );
}