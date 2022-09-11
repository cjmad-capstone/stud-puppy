import React from 'react';
import { pt } from '../../utils/anim/global.js';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const ErrorPage = () => {
    const [params] = useSearchParams();
    const errorCode = parseInt(params.get('status'));
    let title = '';
    let subtitle = '';
    switch (errorCode) {
        case 404:
            title = 'Error 404';
            subtitle = 'Page Not Found';
            break;
        case 403:
            title = 'Error 403';
            subtitle = 'Forbidden';
            break;
        case 401:
            title = 'Error 401';
            subtitle = 'Unauthorized';
            break;
        case 400:
            title = '400';
            subtitle = 'Bad Request';
            break;

        default:
            title = 'Error 404';
            subtitle = 'Not Found';
    }
    return (
        <motion.main {...pt} className={`w-full px-4`}>
            <div className="card w-full h-screen bg-gradient-to-br from-pink-400 to-red-500 text-primary-content">
                <div className="card-body">
                    <img
                        className="absolute mt-[60%] h-[50%] right-3 md:mt-0 md:h-[125%] md:top-0 md: right-0 md:mx-auto md:right-5"
                        src="/img/thug-life-pug-transparent-background-sad-dog-jpg-1226295-min.png"
                        alt="Shoes"
                    />

                    <h2 className="card-title text-8xl">{title} </h2>
                    <p className={'text-3xl'}>{subtitle}</p>
                </div>
            </div>
        </motion.main>
    );
};

export default ErrorPage;
