import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';


function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={`App`}>
            <Routes>
                <Route path={''} element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
