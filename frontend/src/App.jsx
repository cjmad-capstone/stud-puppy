import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Login from './pages/Login.jsx';
import { AnimatePresence } from 'framer-motion';
import Register from './pages/Register';
import Profile from './pages/Profile';

import { useLayoutEffect } from 'react';
import DogProfile from './pages/DogProfile.jsx';

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
                    <Route path={'/events/:id'} element={<Event />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
