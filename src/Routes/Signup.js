import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Helpers/Context";
import Card from "../Common/Card";
import Form from "../Common/Form";
import Backend from "../api";

/**
 * Signup page: Allows users to register and create an account.
 *
 * Shows errors in the case of username not being unique, as well as
 * if username or password field are blank.
 */
export default function Signup() {
    // const { setToken } = useContext(AppContext).tokenState;
    const { setUser } = useContext(AppContext).userState;
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    /**
     * Fields to be used in form. Used by <Form /> component.
     */
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
    /**
     * Checks to make sure the inputs look valid before sending a request
     * to the backend to create a user.
     *
     * In the case that either username or password are blank, the request
     * will never go through and instead an error will be shown.
     *
     * If an account has already been created using the username requested,
     * the backend's message about that will be shown.
     *
     * Otherwise, creates a user and updates user state.
     *
     * Redirects to home page.
     */
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (userInput.username === "") {
            if (userInput.password === "") {
                setErrorMessage("Username/password cannot be blank.");
                return;
            }
            setErrorMessage("Username cannot be blank.");
            return;
        }
        if (userInput.password === "") {
            setErrorMessage("Password cannot be blank.");
            return;
        }
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
