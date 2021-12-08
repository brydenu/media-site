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
            <Route path="/" element={<Home />} />
            <Route path="/song/:id" element={<Song />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/show/:id" element={<Show />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}
