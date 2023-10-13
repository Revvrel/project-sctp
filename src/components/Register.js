import mockAPI from "../api/mockapi";

import Joi from "joi-browser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Register.module.css";

const schema = {
  parentName: Joi.string().min(3).max(30).required(),
  parentIC: Joi.string().min(6).max(9).required(),
  phoneNumber: Joi.number().required(),
  studentName: Joi.string().min(3).max(30).required(),
  studentIC: Joi.string().min(6).max(8).required(),
  loginEmail: Joi.string().email().required(),
  loginPassword: Joi.string().min(6).max(20).required(),
};

function Register({handlerAddItem}) {
  const navigate = useNavigate();

  const [error, setError] = useState([]);
  const [user, setUser] = useState({
    parentName: "",
    parentIC: "",
    phoneNumber: "",
    studentName: "",
    studentIC: "",
    loginEmail: "",
    loginPassword: "",
    loginType: "Parent"
  });

  const handlerOnChange = (event) => {
    const { name, value } = event.target;
    setUser((user) => {
      return {
        ...user,
        [name]: value,
      };
    });

    const errorMessage = validate(event);

    setError((error) => {
      const newError = { ...error };

      if (errorMessage) {
        newError[name] = errorMessage;
      } else {
        delete newError[name];
      }
      return newError;
    });
  };

  const validate = (event) => {
    const { name, value } = event.target;
    const objToCompare = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(objToCompare, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    handlerAddItem(user);
    const result = Joi.validate(user, schema, { abortEarly: false });

    setUser({
      parentName: "",
      parentIC: "",
      phoneNumber: "",
      studentName: "",
      studentIC: "",
      loginEmail: "",
      loginPassword: "",
    })

    navigate(`/`);

    const { error } = result;
    if (!error) {
      console.log(user);
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      setError(errorData);
      console.log("ErrorData", errorData);
      return errorData;
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register Page</h2>
      <form onSubmit={handlerSubmit}>

        <label>Parent Name</label>
        <input
          type="text"
          name="parentName"
          placeholder="Enter Parent Full Name"
          onChange={handlerOnChange}
          value={user.parentName}
        />
        {error.parentName && <p className="error">{error.parentName}</p>}

        <label>Parent IC</label>
        <input
          type="text"
          name="parentIC"
          placeholder="Enter Parent IC"
          onChange={handlerOnChange}
          value={user.parentIC}
        />
        {error.parentIC && <p className="error">{error.parentIC}</p>}

        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          onChange={handlerOnChange}
          value={user.phoneNumber}
        />
        {error.phoneNumber && <p className="error">{error.phoneNumber}</p>}

        <label>Student Name</label>
        <input
          type="text"
          name="studentName"
          placeholder="Enter Student Name"
          onChange={handlerOnChange}
          value={user.studentName}
        />
        {error.studentName && <p className="error">{error.studentName}</p>}

        <label>Student IC</label>
        <input
          type="text"
          name="studentIC"
          placeholder="Enter Student IC"
          onChange={handlerOnChange}
          value={user.studentIC}
        />
        {error.studentIC && <p className="error">{error.studentIC}</p>}

        <label>Email Login</label>
        <input
          type="text"
          name="loginEmail"
          placeholder="Enter Email"
          onChange={handlerOnChange}
          value={user.loginEmail}
        />
        {error.loginEmail && <p className="error">{error.loginEmail}</p>}

        <label>Password</label>
        <input
          type="text"
          name="loginPassword"
          placeholder="Enter Password"
          onChange={handlerOnChange}
          value={user.loginPassword}
        />
        {error.loginPassword && <p className="error">{error.loginPassword}</p>}

        <button onClick={handlerAddItem}>Submit</button>
      </form>
    </div>
  );
}

export default Register;
