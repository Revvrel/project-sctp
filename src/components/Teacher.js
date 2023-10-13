import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Teacher.module.css";

const Teacher = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    // Use the provided API endpoint URL
    const apiUrl = "https://651ebd5c44a3a8aa4768e90d.mockapi.io/users";
    axios
      .get(apiUrl)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleCheckboxChange = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, selected: !student.selected }
          : student
      )
    );
    console.log("This is a student : ", students);
  };
  const handleAttendanceSubmit = () => {
    const selectedStudents = students.filter((student) => student.selected);
    // Mock API endpoint for submitting attendance (replace with your actual API endpoint)
    const apiEndpoint = "https://api.example.com/submitAttendance";
    // Mock POST request to send selected students to the API
    axios
      .post(apiEndpoint, { selectedStudents })
      .then((response) => {
        // Handle the API response as needed
        console.log("Attendance submitted successfully:", response.data);
        // Reset the selected state for all students
        setStudents((prevStudents) =>
          prevStudents.map((student) => ({ ...student, selected: false }))
        );
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };
  return (
    <div>
      <h1>Teacher's Page</h1>
      <table className={styles['table-container']}>
        <thead>
          <tr>
            <th></th>
            <th>Student Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className={student.selected ? styles.selected : ''}
            >
              <td>
                <label className={styles['checkbox-label']}>
                  <input
                    type="checkbox"
                    checked={student.selected}
                    onChange={() => handleCheckboxChange(student.id)}
                  />
                  Select
                </label>
              </td>
              <td>{student.studentName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles['submit-button']} onClick={handleAttendanceSubmit}>
        Submit Attendance
      </button>
    </div>
  );
};
export default Teacher;
