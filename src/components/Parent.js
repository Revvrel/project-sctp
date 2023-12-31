import { useState, useEffect } from "react";
import React from "react";
import mockAPI from "../api/mockapi";
import Table from "./Table";
import { useParams } from "react-router-dom";

function Parent() {
  const { id } = useParams();
  const [status, setStatus] = useState([]);

  const apiGet = async () => {
    console.log("Test");
    try {
      const response = await mockAPI.get(`/users/${id}/attendance`);
      setStatus(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleStatus = async () => {
    console.log("Test");
    try {
      const newStatus =
        status[0].status === "Check In" ? "Check Out" : "Check In";
      console.log("log now", status[0].status);
      console.log("log new", newStatus);

      const newTime = new Date().toLocaleString();
      console.log("log new time", newTime);
      const response = await mockAPI.put(`/users/1/attendance/${id}`, {
        status: newStatus,
        checkInTime: newTime,
      });
      setStatus([response.data]);
    } catch (error) {}
  };

  useEffect(() => {
    apiGet();
    console.log("useEffect");
  }, []);

  console.log("Data1:");

  return (
    <div>
      <h1>Hello Parent!</h1>
      <p>Find out and manage your child checkin status here </p>
      {status && <Table list={status} />}
      <button onClick={toggleStatus}>Checkin/Checkout</button>
    </div>
  );
}

export default Parent;
