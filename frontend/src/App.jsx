import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Login from './pages/Login.jsx';
import { AnimatePresence } from 'framer-motion';
import Register from './pages/Register';
import Profile from './pages/Profile';
import React, { useContext } from 'react';
import Footer from './components/Footer/Footer.jsx';

import CreateEvent from './pages/CreateEvent';

import { useLayoutEffect } from 'react';
import DogProfile from './pages/DogProfile.jsx';

import AllEvents from './pages/AllEvents.jsx';
import IndividualEvent from './pages/IndividualEvent.jsx';

import Logout from './pages/Logout.jsx';
import CreateDog from './pages/CreateDog.jsx';
import ErrorPage from './components/ErrorPage/Error';

import AllDogs from "./pages/AllDogs.jsx";
import AboutPage from "./pages/AboutPage.jsx";

import AllDogs from './pages/AllDogs.jsx';
import { UserContext } from './context/UserContext.jsx';


function App() {
    const location = useLocation();
    const hasVisited = localStorage.getItem('hasVisited');
    const { user } = useContext(UserContext);

    // Set the theme
    useLayoutEffect(() => {
        if (!hasVisited) localStorage.setItem('hasVisited', 'true');
        document.querySelector('html').dataset.theme = 'cupcake';
    }, [hasVisited]);
    return (
        <>
            <Nav />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path={''} element={<Home />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route
                        path={'/profile'}
                        element={<Profile userId={user?.id} />}
                    />
                    <Route path={'/users/:userId'} element={<Profile />} />
                    <Route path={'/dog/:id'} element={<DogProfile />} />
                    <Route path={'/about-us'} element={<AboutPage />} />
                    <Route path={'/events'} element={<AllEvents />} />
                    <Route path={'/events/:id'} element={<IndividualEvent />} />

                    <Route path={'/logout'} element={<Logout />} />
                    <Route path={'/create-dog'} element={<CreateDog />} />
                    <Route path={'/create-event'} element={<CreateEvent />} />

                    <Route path={'/error'} element={<ErrorPage />} />
                    <Route path={'/*'} element={<ErrorPage />} />
                    <Route path={'/alldogs'} element={<AllDogs />} />
                </Routes>
            </AnimatePresence>
            {/*<Footer />*/}
        </>
    );
}

export default App;
