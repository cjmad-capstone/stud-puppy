import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import Button from '../components/Button/Button.jsx';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <motion.main {...pt} className={`w-full px-4`}>
            {/*<div className="card w-100 h-screen bg-base-100 shadow-xl">*/}
            {/*    <div className="card mx-4 w-100 h-full bg-base-100 shadow-xl rounded-tl-full">*/}
            <div className="w-full card bg-gradient-to-br from-pink-400 to-red-500 h-96 rounded-tl-[180px]">
                <div className={'invisible md:visible'}>
                    <p className="text-white font-brand font-bold text-7xl w-1/2 mx-16 mt-14">
                        Welcome to Pugs 'n' Kisses
                    </p>
                    <p className="text-3xl font-brand text-yellow-300 m-12 mx-16">
                        Find your best buddy a play date.
                    </p>
                </div>
                <img
                    className="absolute m-auto right-0 h-[110%] md:h-[110%] top-0"
                    src="/img/homepug-min.png"
                    alt="Shoes"
                />
            </div>
            {/*Mobile Header*/}
            <div className="">
                <div className="md:hidden flex flex-col gap-3">
                    <h2 className="card-title font-brand text-3xl text-blue-900 font-bold">
                        Welcome to Pugs 'n' Kisses
                    </h2>
                    <p className="text-blue-600">
                        Find your best buddy a play date.
                    </p>
                </div>
                <div className={'hidden md:block py-12 mx-[10%] text'}>
                    <p className={'text-3xl  font-brand font-medium'}>
                        We love our canines, we offer them a home, sustenance,
                        unconditional love, but have you ever thought of finding
                        a soulmate for your pup or making miniature copies of
                        them?
                    </p>
                </div>
                <Link to={'/alldogs'}>
                    <Button
                        className={
                            'text-3xl md:text-xl w-50 hover:from-pink-300 hover:to-red-400 mx-auto'
                        }
                    >
                        Start here!
                    </Button>
                </Link>
            </div>
        </motion.main>
    );
};
export default Home;
