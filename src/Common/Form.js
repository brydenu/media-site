import React, { useContext } from "react";
import AppContext from "../Helpers/Context";
import "../Styles/Form.css";

/**
 * Custom form component
 *
 * fields => an array with keys for label, type, fieldName.
 *
 * formClass => class name of entire form.
 *
 * handleSubmit => event handler when form is submitted.
 *
 * inputState => array of [state, setState] for useState used in handleChange.
 */
export default function Form({
    fields,
    formClass,
    handleSubmit,
    inputState,
    buttonLabel,
}) {
    const { remember, setRemember } = useContext(AppContext).rememberState;
    const { errorState } = useContext(AppContext).errorState;
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
                    className={
                        "form-error " + errorState
                            ? "showing-error"
                            : "hiding-error"
                    }
                >
                    {errorState ? errorState.message : ""}
                </div>
                <button type="submit" className="form-button">
                    {buttonLabel}
                </button>
            </div>
        </form>
    );
}
