
import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

// Adding token to request headers
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });

      if (response.status === httpStatus.CREATED) {
        return response.data.message;
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      if (response.status === httpStatus.OK) {
        localStorage.setItem("token", response.data.token);
        router("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const getHistoryOfUser = async () => {
    try {
      const response = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token")
        }
      });

      console.log("Response from backend:", response.data);  // Log response to check format

      // Check if the response is a string
      if (typeof response.data === 'string') {
        // Split the string by newlines or any separator to create an array of meetings
        const meetings = response.data.split('\n').map(item => {
          const [meetingCode, userDetails] = item.split(':');
          return { meetingCode: meetingCode.trim(), userDetails: userDetails.trim() };
        });

        return meetings;
      }

      // If response is already an array or object with meetings, return as is
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (e) {
      console.error("Error fetching history:", e);  // Log the error for debugging
      throw e;
    }
  }





  const addToUserHistory = async (meetingCode) => {
    const token = localStorage.getItem("token");

    if (!token || !meetingCode) {
      throw new Error("Token or meeting code is missing");
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/add_to_activity", {
        token: token,
        meeting_code: meetingCode
      });

      if (response.status === httpStatus.CREATED) {
        console.log("Meeting added to history:", response.data);
      }
    } catch (e) {
      console.error("Error adding meeting to history:", e);
      throw e;
    }
  };


  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
