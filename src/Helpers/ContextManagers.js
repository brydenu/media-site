import React, { useState } from "react";

function ManageSearch() {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert("Need to connect this to backend.");
    };

    return { handleSubmit };
}

export { ManageSearch };
