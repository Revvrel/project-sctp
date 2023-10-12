import React, { useState, useEffect } from "react";
import axios from "axios";

const Teacher = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Use the provided API endpoint URL
    const apiUrl = "https://651ebd5c44a3a8aa4768e90d.mockapi.io/students";

    axios
      .get(apiUrl)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Teacher's Page</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <label>
              <input
                type="checkbox"
                checked={student.selected}
                onChange={() => handleCheckboxChange(student.id)}
              />
              {student.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAttendanceSubmit}>Submit Attendance</button>
    </div>
  );
};

export default Teacher;
