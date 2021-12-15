import React, { useContext } from "react";
import AppContext from "../Helpers/Context";
import "../Styles/Form.css";

/**
 * Custom form component
 *
 * fields: Array with keys for label, type, fieldName.
 *
 * formClass: Class name of entire form.
 *
 * handleSubmit: Event handler when form is submitted.
 *
 * inputState: Array of [state, setState] for useState used in handleChange.
 *
 * buttonLabel: The text that should be displayed on the button
 *
 * errorMessage: Message if something goes wrong ("Invalid username/password", "Username already exists", etc)
 */
export default function Form({
    fields,
    formClass,
    handleSubmit,
    inputState,
    buttonLabel,
    errorMessage = "",
}) {
    const { remember, setRemember } = useContext(AppContext).rememberState;
    const setInput = inputState[1];
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setInput((inputs) => ({
            ...inputs,
            [name]: value,
        }));
    };

    const toggleRemember = () => {
        setRemember((current) => !current);
    };

    const rememberUser = () => {
        const checkboxClass = remember ? "remembered-true" : "remembered-false";
        if (formClass === "signup" || formClass === "login") {
            return (
                <div className="checkbox-group" onClick={toggleRemember}>
                    <div className="checkbox-outer">
                        <div className={"custom-checkbox " + checkboxClass} />
                    </div>
                    <p className="remembered-label">
                        Stay signed in on this browser?
                    </p>
                </div>
            );
        }
    };

    return (
        <form className={"custom-form " + formClass} onSubmit={handleSubmit}>
            {fields.map((field) => {
                return (
                    <div className={`form-group ${field.fieldName}`}>
                        <label htmlFor={field.fieldName}>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.fieldName}
                            onChange={handleChange}
                            value={field.value}
                            placeholder={field.placeholder || ""}
                            autoComplete="off"
                        />
                    </div>
                );
            })}
            <div className="clickables-group">
                {rememberUser()}
                <div
                    className={`form-error ${
                        errorMessage ? "showing-error" : "hiding-error"
                    }`}
                >
                    {errorMessage}
                </div>
                <button type="submit" className="form-button">
                    {buttonLabel}
                </button>
            </div>
        </form>
    );
}
