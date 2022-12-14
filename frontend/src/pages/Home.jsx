import { motion } from 'framer-motion';
import { pt } from '../utils/anim/global.js';
import Button from '../components/Button/Button.jsx';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

const Home = () => {
    const { user } = useContext(UserContext);

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
                    alt="Pug photo"
                />
            </div>
            {/*Mobile Header*/}
            <div className="">
                <div className="md:hidden flex flex-col gap-3 pt-6">
                    <h2 className="card-title font-brand text-4xl text-blue-900 font-bold">
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
                <Link to={user ? '/alldogs' : '/register'}>
                    <Button
                        className={
                            'text-3xl md:text-xl w-50 hover:from-pink-300 hover:to-red-400 mx-auto'
                        }
                    >
                        Get Started
                    </Button>
                </Link>
            </div>
        </motion.main>
    );
};
export default Home;
