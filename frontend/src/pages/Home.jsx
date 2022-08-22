import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import DogCard from '../components/DogCard/DogCard.jsx';
import Nav from '../components/Nav/Nav.jsx';
import {Navbar} from "react-daisyui";
import Button from '../components/Button/Button.jsx';


const Home = () => {
    return (
        <motion.main {...pt} className={`absolute md:static w-full`}>
            {/*<div className="card w-100 h-screen bg-base-100 shadow-xl">*/}
            {/*    <div className="card mx-4 w-100 h-full bg-base-100 shadow-xl rounded-tl-full">*/}
                  <div className="min-w-full card md:mx-4 bg-gradient-to-br from-pink-400 to-red-500 h-96 rounded-tl-[180px]">
<div className={""}>
                            <img className="absolute m-auto right-0 w-3/4 md:w-1/4 top-0" src="img/homepug.png" alt="Shoes"/>
</div>
                  </div>
                {/*</div>*/}
                <div className="card-body">
                    <h2 className="card-title text-3xl md:text-xl text-blue-900 font-bold">Welcome to  Pugs 'n' Kisses</h2>
                    <p className="text-blue-600">Find your best buddy a play date.</p>
                    <div>
                        <Button className={'text-3xl md:text-xl w-50 hover:from-pink-300 hover:to-red-400 '}>
                            Get dog NOW
                        </Button>
                    </div>
                </div>
            {/*</div>*/}


        </motion.main>
);
};
export default Home;
