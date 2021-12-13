import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Helpers/Context";
import Card from "../Common/Card";
import Form from "../Common/Form";
import Backend from "../api";

export default function Signup() {
    const { setToken } = useContext(AppContext).tokenState;
    const { setUser } = useContext(AppContext).userState;
    const { errorState, setErrorState } = useContext(AppContext).errorState;
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const headerContent = <h1 className="signup-title">Sign up</h1>;
    const formFields = [
        {
            label: "Username",
            type: "text",
            fieldName: "username",
            required: true,
        },
        {
            label: "First Name",
            type: "text",
            fieldName: "firstName",
            required: false,
        },
        {
            label: "Last Name",
            type: "text",
            fieldName: "lastName",
            required: false,
        },
        {
            label: "Password",
            type: "password",
            fieldName: "password",
            required: true,
        },
    ];
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const data = await Backend.registerUser(userInput);
        if (data.error) {
            setErrorState(data.error);
            return;
        }
        setErrorState(null);
        const newUser = data.user;
        newUser.queries = [];
        setUser(newUser);
        navigate("/");
    };
    const bodyContent = (
        <Form
            fields={formFields}
            formClass="signup"
            handleSubmit={handleSubmit}
            inputState={[userInput, setUserInput]}
            buttonLabel="Register"
        />
    );
    return (
        <div className="main-signup">
            <Card
                header={headerContent}
                body={bodyContent}
                cardClass="signup"
            />
        </div>
    );
}
