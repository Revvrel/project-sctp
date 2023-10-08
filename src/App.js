import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
// import QRCode from "react-qr-code";
import Register from "./components/Register";
import Parent from "./components/Parent";
import mockAPI from "./api/mockapi";
import Table from "./components/Table";

//test

function App() {
  const [status, setStatus] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  const toggleStatus = async () => {
    try {
      const currentStatus = status.status;
      const newStatus = currentStatus === "Check In" ? "Check Out" : "Check In";

      const response = await mockAPI.put(`/users/1/attendance/1`, {
        ...status,
        status: newStatus,
      });

      setStatus(response.data);
      setIsToggled((prevIsToggled) => !prevIsToggled); // Toggle the state
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const apiGet = async () => {
    console.log("Test");
    try {
      const response = await mockAPI.get(`/users/1/attendance`);
      setStatus(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    apiGet();
  }, []);

  return (
    <div>
      {/* <QRCode value = "test" /> */}
      <Register />
      {/* <Parent /> */}
      <h1>Parents Page</h1>
      <p>Status: {status.status}</p>
      <button onClick={toggleStatus}>Checkin/Checkout</button>
      <button onClick={apiGet}>Refresh</button>
      {status && <Table list={status} />}
    </div>
  );
}

export default App;
