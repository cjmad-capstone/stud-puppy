import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import DogCard from '../components/DogCard/DogCard.jsx';
import Nav from '../components/Nav/Nav.jsx';
import { Navbar } from 'react-daisyui';
import Button from '../components/Button/Button.jsx';
import Footer from '../components/Footer/Footer';

const Home = () => {
    return (
        <motion.main {...pt} className={`w-full px-4`}>
            {/*<div className="card w-100 h-screen bg-base-100 shadow-xl">*/}
            {/*    <div className="card mx-4 w-100 h-full bg-base-100 shadow-xl rounded-tl-full">*/}
            <div className="w-full card bg-gradient-to-br from-pink-400 to-red-500 h-96 rounded-tl-[180px]">
                <div className={'invisible md:visible'}>
                    <p className="text-white font-bold text-7xl w-1/2 mx-12 mt-14">
                        Welcome to Pugs 'n' Kisses
                    </p>
                    <p className="text-3xl text-yellow-300 m-12">
                        Find your best buddy a play date.
                    </p>
                </div>
                <img
                    className="absolute m-auto right-0 h-[150%] md:h-[110%] top-0"
                    src="img/homepug-min.png"
                    alt="Shoes"
                />
            </div>
            {/*</div>*/}
            <div className="card-body">
                <div className="visible md:invisible">
                    <h2 className="card-title text-3xl text-blue-900 font-bold">
                        Welcome to Pugs 'n' Kisses
                    </h2>
                    <p className="text-blue-600">
                        Find your best buddy a play date.
                    </p>
                </div>
                <div className={'hidden md:block'}>
                    <p className={'text-3xl mx-[10%]'}>
                        We love our canines, we offer them a home, sustenance,
                        unconditional love, but have you ever thought of finding
                        a soulmate for your pup or making miniature copies of
                        them?
                    </p>
                </div>
                <Button
                    className={
                        'text-3xl md:text-xl w-50 hover:from-pink-300 hover:to-red-400 sm:overflow-auto md:mx-auto'
                    }
                >
                    Get dog NOW
                </Button>
            </div>
            {/*</div>*/}
        </motion.main>
    );
};
export default Home;
