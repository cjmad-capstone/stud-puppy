import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/anim/global.js';
import { Card } from 'react-daisyui';

const _Card = motion(Card);

const AnimatedCard = ({ children, className, ...props }) => {
    return (
        <_Card
            className={`w-[350px] shadow-xl ${className}`}
            layout
            {...props}
            {...fadeIn}
        >
            {children}
        </_Card>
    );
};
export default AnimatedCard;
