import { useState, useEffect } from "react";

export default function useRemember(token, user) {
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        if (remember) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [remember, token, user]);

    return [remember, setRemember];
}
