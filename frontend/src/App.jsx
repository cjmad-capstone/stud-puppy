import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import { Theme } from 'react-daisyui';
import Login from './pages/Login.jsx';
import { AnimatePresence } from 'framer-motion';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DogCard from "./components/DogCard/DogCard.jsx";


function App() {
    const location = useLocation();
    return (
        <Theme dataTheme="dracula">
            <Nav/>
            {/*<DogCard />*/}
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path={''} element={<Home />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/profile'} element={<Profile />} />
                </Routes>
            </AnimatePresence>
        </Theme>
    );
}

export default App;
