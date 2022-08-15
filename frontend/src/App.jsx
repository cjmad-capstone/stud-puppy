import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Nav from './components/Nav.jsx';


function App() {

    return (
        <div className={`App`}>
            <Nav/>
            <Routes>
                <Route path={''} element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
