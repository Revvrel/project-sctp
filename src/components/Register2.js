import React from "react";
import { initialState, userReducer } from "../reducer/UserReducer";
import { useState, useReducer } from "react";
import mockAPI from "../api/mockapi";
import Joi from "joi-browser";
import styles from "./Register.module.css";

const schema = {
    parentName: Joi.string().min(3).max(40).required(),
    parentIC: Joi.string().min(9).max(9).required(),
    phoneNumber: Joi.number().min(8).max(20).required(),
    studentName: Joi.string().min(3).max(40).required(),
    studentIC: Joi.string().min(9).max(9).required(),
    loginEmail: Joi.string().email().required(),
    loginPassword: Joi.string().min(6).max(20).required(),
};

function Register2() {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const handlerOnChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: "SET_USER", name, value });

        const errorMessage = validate(event);
        if (errorMessage) {
            dispatch({ type: "SET_ERROR", name, message: errorMessage });
        } else {
            dispatch({ type: "RESET_ERROR", name });
        }
    };

    const validate = (event) => {
        const { name, value } = event.target;
        const objToCompare = { [name]: value };
        const subSchema = { [name]: schema[name] };
        const result = Joi.validate(objToCompare, subSchema);
        const { error } = result;
        return error ? error.details[0].message : null;
    };

    const handlerOnSubmit = (event) => {
        event.preventDefault();
        const result = Joi.validate(state.user, schema, { abortEarly: false });
        const { error } = result;
        if (!error) {
            console.log(state.user);
        } else {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                const message = item.message;
                errorData[name] = message;
            }
            dispatch({ type: "SET_ERROR", ...errorData });
            console.log("ErrorData", errorData);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Register Page</h2>
            <form onSubmit={handlerOnSubmit}>

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

                <button>Submit</button>
                <button>Reset</button>
            </form>
        </div>
    );
}

export default Register2;
