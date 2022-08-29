import { DogName } from '../components/CreateDogForm/DogName';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { motion } from 'framer-motion';
import { DogSexAndWeight } from '../components/CreateDogForm/DogSexAndWeight.jsx';
import { DogDescription } from '../components/CreateDogForm/DogDescription';
import { DogDOB } from '../components/CreateDogForm/DogDOB';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../utils/auth/authHeader.js';
import { DogImages } from '../components/CreateDogForm/DogImages';
import { UserContext } from '../context/UserContext.jsx';
import Loading from 'react-loading';

const CreateDog = () => {
    const navigate = useRef(useNavigate());

    const { user } = useContext(UserContext);

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

    const submitForm = useCallback(async () => {
        try {
            await Promise.all(
                formData.images.map((image) => {
                    const formData = new FormData();
                    formData.append('file', image);
                    formData.append(
                        'fileName',
                        `${user.username}/dogs/${image.path}`
                    );

                    return fetch('/api/s3/upload', {
                        method: 'POST',
                        headers: {
                            ...authHeader(),
                        },
                        body: formData,
                    });
                })
            );
        } catch (err) {
            console.error(err);
        }

        const newImages = formData.images.map((image) => ({
            url: image.path,
        }));

        const newFormData = { ...formData, images: newImages };
        fetch('/api/dogs', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...authHeader(),
            },
            body: JSON.stringify(newFormData),
        })
            .then((res) => res.json())
            .then((data) => {
                // Go to the new dog's profile if data submitted successfully
                navigate.current('/dog/' + data.id);
            });
    }, [formData, user?.username]);

    useEffect(() => {
        if (step === steps.length)
            submitForm().then((data) => console.log(data));
    }, [step, steps.length, submitForm]);

    return (
        <motion.main
            {...pt}
            className={'relative flex flex-col justify-center items-center'}
        >
            <AnimatePresence mode="wait">
                {steps.map((el, idx) => step === idx && el)}
                {step === steps.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex flex-col justify-center items-center`}
                    >
                        <h1 className="text-4xl font-brand font-bold">
                            Creating pupper...
                        </h1>
                        <Loading type="bubbles" color="black" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
};

export default CreateDog;
