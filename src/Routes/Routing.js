import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import Home from "./Home";
import Song from "./Song";
import Movie from "./Movie";
import Show from "./Show";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";

export default function Routing() {
    return (
        <Routes>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/song">
                <Song />
            </Route>
            <Route path="Movie">
                <Movie />
            </Route>
            <Route path="/show">
                <Show />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
        </Routes>
    );
}
