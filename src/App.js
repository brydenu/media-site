import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Common/Navbar";
import Routing from "./Routes/Routing";
import "./Styles/App.css";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routing />
            </BrowserRouter>
        </div>
    );
}
