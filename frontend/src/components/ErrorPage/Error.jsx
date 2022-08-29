import React from 'react';
import {pt} from "../../utils/anim/pageTransitions.js";
import { motion } from 'framer-motion';
import {useSearchParams} from "react-router-dom";


const ErrorPage= () =>{
    const [params] = useSearchParams()
    const errorCode = parseInt(params.get('status'));
    let title = '';
    let  subtitle = ''
    switch (errorCode){
        case 404:
            title = 'Error 404'
            subtitle = 'Page Not Found'
            break;
    }
    return (
        <motion.main {...pt} className={`w-full px-4`}>
            <div className="card w-full h-96 bg-gradient-to-br from-pink-400 to-red-500 text-primary-content">
                <div className="card-body">
                    <img className="absolute m-auto right-0 h-[150%] md:h-[110%] top-0" src="img/doge-punching-cheems.png" alt="Shoes"/>

                    <h2 className="card-title ">{title} </h2>
                    <p>{subtitle}</p>
                </div>
            </div>
        </motion.main>
    );
};

export default ErrorPage;