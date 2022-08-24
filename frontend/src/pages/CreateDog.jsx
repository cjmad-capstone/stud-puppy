import { DogName } from '../components/CreateDogForm/DogName';
import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { motion } from 'framer-motion';
import { DogSexAndWeight } from '../components/CreateDogForm/DogSexAndWeight.jsx';
import { DogDescription } from '../components/CreateDogForm/DogDescription';
import { DogDOB } from '../components/CreateDogForm/DogDOB';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../utils/auth/authHeader.js';
import { DogImages } from '../components/CreateDogForm/DogImages';

const CreateDog = () => {
    const navigate = useRef(useNavigate());

    const [step, setStep] = React.useState(0);
    const [formData, setFormData] = React.useState({
        name: '',
        sex: '',
        weight: 0,
        dob: '',
        description: '',
        loveable: false,
        images: [],
    });

    const changeStep = (direction, data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + direction);
    };

    const props = { changeStep, formData, setFormData };

    const steps = [
        <DogName key="dog-name" {...props} />,
        <DogSexAndWeight key="dog-sex-weight" {...props} />,
        <DogDOB key="dog-dob" {...props} />,
        <DogDescription key="dog-desc" {...props} />,
        <DogImages key="dog-images" {...props} />,
    ];

    useEffect(() => {
        const submitForm = () => {
            fetch('/api/dogs', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => {
                    navigate.current('/dog/' + data.id);
                });
        };

        if (step === steps.length) submitForm();
    }, [formData, step, steps.length]);

    return (
        <motion.main
            {...pt}
            className={'relative flex flex-col justify-center items-center'}
        >
            <div className="absolute top-0 left-0">
                {JSON.stringify(formData)}
            </div>
            <AnimatePresence mode="wait">
                {steps.map((el, idx) => step === idx && el)}
            </AnimatePresence>
        </motion.main>
    );
};

export default CreateDog;
