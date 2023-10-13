import "./App.css";
import { useState } from "react";
import React from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Teacher from "./components/Teacher";
import Parent from "./components/Parent";

import mockAPI from "./api/mockapi";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//test

function App() {
  const [users, setUsers] = useState([]);

  const apiGet = async () => {
    try {
      const response = await mockAPI.get(`/users/`);
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const apiPost = async (newUser) => {
    const userAttendance = {
      parentName: newUser.parentName,
      studentName: newUser.studentName,
      status: "Check In",
      checkInTime: "",
      userId: newUser.id,
    };
    try {
      const response = await mockAPI.post(`/users`, newUser);
      console.log(response.data);
      apiGet();
      console.log("This is user ID: ", newUser.id);
      console.log("This is attendance ID:" , newUser.userId);
      const response2 = await mockAPI.post(`/users/1/attendance`,userAttendance);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="parent/:id" element={<Parent />} />
        <Route path="teacher/:id" element={<Teacher />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="register" element={<Register handlerAddItem={apiPost} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
