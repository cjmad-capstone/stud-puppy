import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import DogCard from '../components/DogCard/DogCard.jsx';

const Home = () => {
    return <motion.main {...pt}>{/*Cynthia you can work here*/}</motion.main>;
};
export default Home;
