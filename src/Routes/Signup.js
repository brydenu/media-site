import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Helpers/Context";
import Card from "../Common/Card";
import Form from "../Common/Form";
import Backend from "../api";

export default function Signup() {
    // const { setToken } = useContext(AppContext).tokenState;
    const { user, setUser } = useContext(AppContext).userState;
    const [errorMessage, setErrorMessage] = useState("");
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
            setErrorMessage(data.error.message);
            return;
        }
        setUser(data.user);
        navigate("/");
    };
    const generateBody = () => (
        <Form
            fields={formFields}
            formClass="signup"
            handleSubmit={handleSubmit}
            inputState={[userInput, setUserInput]}
            buttonLabel="Register"
            errorMessage={errorMessage}
        />
    );
    return (
        <div className="main-signup">
            <Card
                header={headerContent}
                body={generateBody()}
                cardClass="signup"
            />
        </div>
    );
}
