import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AppContext from "../Helpers/Context";
import Form from "../Common/Form";
import Card from "../Common/Card";
import Backend from "../api";

/**
 * Login page.
 *
 * On submit, sends request using form data to backend, to attempt to login.
 *
 * On successful login, redirects to home page.
 */
export default function Login() {
    const { setToken } = useContext(AppContext).tokenState;
    const { setUser } = useContext(AppContext).userState;
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });
    const headerContent = <h1 className="login-title">Login</h1>;

    const formFields = [
        {
            label: "Username",
            type: "text",
            fieldName: "username",
            required: true,
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
        const res = await Backend.loginUser(userInput);
        const { queries } = await Backend.getQueryHistory(res.user.username);
        res.user.queries = queries;
        setToken(res.token);
        setUser(res.user);
        navigate("/");
    };

    const bodyContent = (
        <Form
            fields={formFields}
            formClass="login"
            handleSubmit={handleSubmit}
            inputState={[userInput, setUserInput]}
            buttonLabel="Login"
        />
    );
    return (
        <div className="main-login">
            <Card header={headerContent} body={bodyContent} cardClass="login" />
        </div>
    );
}
