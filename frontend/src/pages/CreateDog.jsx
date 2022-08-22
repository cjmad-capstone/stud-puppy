import { withAuth } from '../utils/auth/withAuth.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../components/Button/Button.jsx';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'react-daisyui';
import { errorIcon } from '../components/icons/icons.jsx';
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { useValidate } from '../utils/hooks/useValidate.js';

const validationSchema = {
    name: yup.string().required('Name is required'),
    age: yup
        .number()
        .typeError('Age must be a number')
        .required('Age is required'),
    breed: yup.string().required('Breed is required'),
};

const FormPage = ({
    children,
    handleSubmit,
    setFormData,
    previousStep,
    nextStep,
    errors,
}) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const errorMsgs = Object.values(errors).map((error) => error.message);
    const nextStepAction = useCallback(
        handleSubmit((data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            const oldParams = Object.fromEntries(
                new URLSearchParams(location.search)
            );
            // Adding the query parameters after each step to persist form data
            navigate({
                pathname: location.href,
                search: `${createSearchParams({ ...oldParams, ...data })}`,
            });
            nextStep();
        }),
        [handleSubmit, nextStep, setFormData, navigate]
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') nextStepAction();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [nextStepAction]);

    return (
        <div className={`relative my-auto mx-auto w-1/3`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0.25 } }}
                className={` flex flex-col items-center gap-4  justify-center p-4 bg-base-100 rounded-xl`}
            >
                <AnimatePresence>
                    {errorMsgs.length > 0 && (
                        <motion.div
                            initial={{
                                height: 0,
                                scaleY: 0,
                                opacity: 0,
                            }}
                            animate={{
                                height: 'auto',
                                scaleY: 1,
                                opacity: 1,
                            }}
                            exit={{
                                height: 0,
                                scaleY: 0,
                                opacity: 0,
                            }}
                        >
                            <Alert status="error" icon={errorIcon}>
                                {errorMsgs?.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>
                {children}
                <div className={`flex`}>
                    {previousStep && (
                        <Button onClick={() => previousStep()}>Previous</Button>
                    )}
                    {nextStep && (
                        <Button onClick={() => nextStepAction()}>Next</Button>
                    )}
                </div>
            </motion.div>
            {/*Background*/}
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

const DogName = ({ nextStep, formData, setFormData }) => {
    const [params] = useSearchParams();
    const { register, handleSubmit, errors } = useValidate({
        name: validationSchema.name,
    });

    return (
        <FormPage
            errors={errors}
            nextStep={nextStep}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
        >
            <h1 className={`text-4xl font-brand font-bold`}>
                Tell us a little about your furry friend...
            </h1>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">What's their name?</span>
                </label>

                <input
                    {...register('name')}
                    type="text"
                    placeholder="Type here..."
                    defaultValue={formData.name}
                    className="input input-bordered w-full"
                />
            </div>
        </FormPage>
    );
};
const DogAge = ({ previousStep, nextStep, formData, setFormData }) => {
    const { register, handleSubmit, errors } = useValidate({
        age: validationSchema.age,
    });

    return (
        <FormPage
            errors={errors}
            nextStep={nextStep}
            previousStep={previousStep}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
        >
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">
                        How old is {formData.name}?
                    </span>
                </label>

                <input
                    {...register('age')}
                    type="text"
                    placeholder="Type here..."
                    defaultValue={formData.age}
                    className="input input-bordered w-full"
                />
            </div>
        </FormPage>
    );
};

const CreateDog = () => {
    const [params] = useSearchParams();

    const [formData, setFormData] = useState({
        name: params.get('name'),
        age: params.get('age'),
        location: params.get('location'),
        loveable: params.get('loveable'),
    });

    const [step, setStep] = useState(0);
    const nextStep = () => {
        setStep((prev) => prev + 1);
    };
    const previousStep = () => setStep((prev) => prev - 1);

    const main = useRef();
    useEffect(() => {
        setTimeout(() => {
            main.current?.scrollIntoView();
        }, 1000);
    }, []);

    return (
        <motion.main className={`p-4 flex`} ref={main}>
            <div className="absolute">{JSON.stringify(formData)}</div>
            <AnimatePresence mode="wait">
                {[
                    <DogName
                        key="basicInfo"
                        nextStep={nextStep}
                        formData={formData}
                        setFormData={setFormData}
                    />,
                    <DogAge
                        key="moreInfo"
                        previousStep={previousStep}
                        nextStep={nextStep}
                        formData={formData}
                        setFormData={setFormData}
                    />,
                ].filter((el, index) => index === step)}
            </AnimatePresence>
        </motion.main>
    );
};

export default withAuth(CreateDog, '/login?ref=create-dog');
