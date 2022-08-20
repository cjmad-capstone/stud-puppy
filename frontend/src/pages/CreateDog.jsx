import { withAuth } from '../utils/auth/withAuth.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button/Button.jsx';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'react-daisyui';
import { errorIcon } from '../components/icons/icons.jsx';

const FormPage = ({ children }) => {
    return (
        <div className={`relative my-auto mx-auto w-1/3`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0.25 } }}
                className={` flex flex-col items-center gap-4  justify-center p-4 bg-base-100 rounded-xl`}
            >
                {children}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                    opacity: 1,
                    scaleX: 1,
                    transition: { delay: 0.25, type: 'linear' },
                }}
                exit={{ opacity: 0 }}
                transition={{ type: 'linear' }}
                className={`absolute -inset-2 bg-red-100 -z-20 rounded-xl bg-gradient-to-br from-secondary to-accent`}
            />
        </div>
    );
};

const BasicInfo = ({ nextStep, visible }) => {
    const schema = yup.object({
        name: yup.string().required('Name is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    console.log(errors);
    return (
        <FormPage>
            <h1 className={`text-4xl font-brand font-bold`}>
                Tell us a little about your furry friend...
            </h1>
            <div className="form-control w-full">
                <AnimatePresence>
                    {Object.keys(errors).length > 0 && (
                        <motion.div
                            initial={{ height: 0, scaleY: 0, opacity: 0 }}
                            animate={{
                                height: 'auto',
                                scaleY: 1,
                                opacity: 1,
                            }}
                            exit={{ height: 0, scaleY: 0, opacity: 0 }}
                        >
                            <Alert status="error" icon={errorIcon}>
                                {errors.name?.message}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>
                <label className="label">
                    <span className="label-text">What's their name?</span>
                </label>

                <input
                    {...register('name')}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                />
            </div>
            <Button onClick={handleSubmit(() => nextStep())}>Next</Button>
        </FormPage>
    );
};

const MoreInfo = ({ previousStep, nextStep, visible }) => {
    const schema = yup.object({
        age: yup
            .number()
            .min(0, 'Age must be a positive number')
            .max(100, "I doubt they're that old")
            .required('Age is required'),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormPage>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">How old are they?</span>
                </label>
                <input
                    {...register('age')}
                    onKeyDown={(e) => handleKeyPress(e, nextStep)}
                    type="number"
                    className="input input-bordered w-full"
                />
            </div>
            <div className={`flex`}>
                <Button onClick={() => previousStep()}>Previous</Button>
                <Button onClick={() => nextStep()}>Next</Button>
            </div>
        </FormPage>
    );
};

const CreateDog = () => {
    const [step, setStep] = useState(0);
    const nextStep = () => {
        setStep((step) => step + 1);
    };
    const previousStep = () => {
        setStep((step) => step - 1);
    };

    const main = useRef();
    useEffect(() => {
        setTimeout(() => {
            main.current?.scrollIntoView();
        }, 1000);
    }, []);

    return (
        <motion.main className={`p-4 flex`} ref={main}>
            <AnimatePresence mode="wait">
                {[
                    <BasicInfo key="basicInfo" nextStep={nextStep} />,
                    <MoreInfo
                        key="moreInfo"
                        previousStep={previousStep}
                        nextStep={nextStep}
                    />,
                ].filter((el, index) => index === step)}
            </AnimatePresence>
        </motion.main>
    );
};

export default withAuth(CreateDog, '/login?ref=create-dog');
