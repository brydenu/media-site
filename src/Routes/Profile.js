import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import AppContext from "../Helpers/Context";
import HistoryCard from "../Common/HistoryCard";
import Card from "../Common/Card";
import Form from "../Common/Form";
import Backend from "../api";
import "../Styles/Profile.css";

/**
 * Profile page.
 *
 * Shows an edit user form which allows the user to change the name they initially provided.
 *
 * Requires correct password for change to work.
 *
 * Also renders history of user searches in card formats. (Cards show top 3 hits of each media type from each query)
 */
export default function Profile() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext).userState;
    const [errorMessage, setErrorMessage] = useState("");
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
            label: "Change password",
            type: "password",
            fieldName: "newPassword",
            required: false,
        },
        {
            label: "Password required to confirm changes",
            type: "password",
            fieldName: "password",
            required: true,
        },
    ];

    /**
     * Sends patch request to backend based on what the user wanted to update.
     *
     * Requires correct password.
     *
     * Shows an error message if password incorrect (or if there are other problems).
     */
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const updated = { username: user.username, ...userInput };
        const res = await Backend.updateUser(updated);
        if (res.error) {
            setErrorMessage(res.error.message);
            return;
        }
        const { queries } = await Backend.getQueryHistory(res.user.username);
        res.user.queries = queries;
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
            errorMessage={errorMessage}
        />
    );

    return (
        <div className="main-profile">
            <Card
                header={headerContent}
                body={bodyContent}
                cardClass="user-profile"
            />
            <HistoryCard size="small" />
        </div>
    );
}
