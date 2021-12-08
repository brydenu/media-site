import React, { useState, useContext } from "react";
import AppContext from "../Helpers/Context";
import Card from "../Common/Card";
import Form from "../Common/Form";
import Backend from "../api";
import { useNavigate } from "react-router";

export default function Profile() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext).userState;
    const [userInput, setUserInput] = useState({
        password: "",
        firstName: "",
        lastName: "",
    });
    const formFields = [
        {
            label: "First Name",
            type: "text",
            fieldName: "firstName",
            placeholder: user.firstName,
            required: false,
        },
        {
            label: "Last Name",
            type: "text",
            fieldName: "lastName",
            placeholder: user.lastName,
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
        const updated = { username: user.username, ...userInput };
        const res = await Backend.updateUser(updated);
        setUser(res.user);
        navigate("/");
    };

    const headerContent = <h1 className="profile-title">Edit Profile</h1>;
    const bodyContent = (
        <Form
            fields={formFields}
            formClass="edit-profile"
            handleSubmit={handleSubmit}
            inputState={[userInput, setUserInput]}
            buttonLabel="Confirm changes"
        />
    );
    return (
        <Card
            header={headerContent}
            body={bodyContent}
            cardClass="user-profile"
        />
    );
}
