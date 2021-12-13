import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Song from "./Song";
import Movie from "./Movie";
import Show from "./Show";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import Search from "./Search";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:q" element={<Search />} />
            <Route path="/song/:id" element={<Song />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/show/:id" element={<Show />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
