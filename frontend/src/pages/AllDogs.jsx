import { useEffect, useRef, useState } from 'react';
import DogCard from '../components/DogCard/DogCard.jsx';
import Nav from '../components/Nav/Nav.jsx';
import { pt } from '../utils/anim/global.js';
import { motion } from 'framer-motion';
import React from 'react';

const AllDogs = () => {
    // Fetches data from api, gets json from the response
    function getDogs() {
        return fetch('/api/dogs').then((res) => res.json());
    }

    // State that will hold our dogs array when the data is fetched
    const [dogs, setDogs] = useState();

    // Effect gets called when the component is mounted (put into the DOM)
    // it then uses our getDogs function to fetch and set the state
    useEffect(() => {
        getDogs().then((data) => {
            console.log(data);
            setDogs(data);
        });
    }, []);

    // Wait for dogs to load before rendering
    if (!dogs) return null;

    return (
        <motion.main {...pt}>
            <div className={`flex flex-col items-center`}>
                <h1
                    className={
                        'font-bold text-5xl md:text-6xl font-brand pb-10'
                    }
                >
                    Pugs 'n' Kisses
                </h1>
                <hr
                    className={
                        'block w-3/4 md:hidden border-t-2 border-secondary w-96 mx-auto pb-5'
                    }
                />

                <div className={'flex flex-wrap justify-center gap-4'}>
                    {dogs?.map((dog, idx) => (
                        <DogCard dog={dog} key={idx} />
                    ))}
                </div>
                <hr
                    className={
                        'block w-3/4 md:hidden border-t-2 border-secondary w-96 mx-auto mt-8'
                    }
                />
                <div className={'flex justify-center'}>
                    <a
                        href={'#'}
                        className="btn btn-ghost my-5 sm:mt-7 lg:mt-14 px-12"
                    >
                        ^ Scroll to top ^
                    </a>
                </div>
            </div>
        </motion.main>
    );
};
export default AllDogs;
