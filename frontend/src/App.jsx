import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Login from './pages/Login.jsx';
import { AnimatePresence } from 'framer-motion';
import Register from './pages/Register';
import Profile from './pages/Profile';
import React from 'react';
import Footer from './components/Footer/Footer.jsx';

import CreateEvent from './pages/CreateEvent';

import { useLayoutEffect } from 'react';
import DogProfile from './pages/DogProfile.jsx';

import AllEvents from "./pages/AllEvents.jsx";
import IndividualEvent from "./pages/IndividualEvent.jsx";

import Logout from './pages/Logout.jsx';
import CreateDog from './pages/CreateDog.jsx';


function App() {
    const location = useLocation();
    // Set the theme
    useLayoutEffect(() => {
        document.querySelector('html').dataset.theme = 'cupcake';
    }, []);
    return (
        <>
            <Nav />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path={''} element={<Home />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/dog/:id'} element={<DogProfile />} />

                    <Route path={'/events'} element={<AllEvents />} />
                    <Route path={'/events/:id'} element={<IndividualEvent />} />

                    <Route path={'/logout'} element={<Logout />} />
                    <Route path={'/create-dog'} element={<CreateDog />} />

                </Routes>
            </AnimatePresence>
            <Footer />
        </>
    );
}

export default App;
