import { withAuth } from '../utils/auth/withAuth.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import { useValidate } from '../utils/hooks/useValidate.js';
import {
    FormInputContainer,
    FormPage,
} from '../components/FormPage/FormPage.jsx';

const validationSchema = {
    name: yup.string().required('Name is required'),
    description: yup
        .string()
        .max(200, 'Description must be less than 200 characters')
        .required('Description is required'),
    age: yup
        .number()
        .min(0, 'Age must be a positive number')
        .typeError('Age must be a number')
        .required('Age is required'),
    breed: yup.string().required('Breed is required'),
};

const DogName = ({ previousStep, nextStep, formData, setFormData }) => {
    const { register, handleSubmit, errors } = useValidate({
        name: validationSchema.name,
    });

    return (
        <FormPage
            {...{ errors, previousStep, nextStep, setFormData, handleSubmit }}
        >
            <FormInputContainer label="What's their name?">
                <input
                    className="input input-bordered input-secondary"
                    defaultValue={formData.name}
                    {...register('name')}
                />
            </FormInputContainer>
        </FormPage>
    );
};
const DogAge = ({ previousStep, nextStep, formData, setFormData }) => {
    const { register, handleSubmit, errors } = useValidate({
        age: validationSchema.age,
    });

    return (
        <FormPage
            {...{ errors, previousStep, nextStep, setFormData, handleSubmit }}
        >
            <FormInputContainer
                defaultValue={formData.age}
                register={register('age')}
                label={`How old is ${formData.name ?? 'your dog'}?`}
            >
                <input
                    className="input input-bordered input-secondary"
                    type="number"
                    defaultValue={formData.age}
                    {...register('age')}
                />
            </FormInputContainer>
        </FormPage>
    );
};
const DogDescription = ({ previousStep, nextStep, formData, setFormData }) => {
    const { register, handleSubmit, errors } = useValidate({
        description: validationSchema.description,
    });

    return (
        <FormPage
            errors={errors}
            previousStep={previousStep}
            nextStep={nextStep}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            last
        >
            <FormInputContainer
                label={`Let us get to know ${formData.name}...`}
            >
                <textarea
                    {...register('description')}
                    defaultValue={formData.description}
                    className="textarea textarea-bordered"
                    placeholder="Tell us a bit more"
                />
            </FormInputContainer>
        </FormPage>
    );
};

const CreateDog = () => {
    const [params] = useSearchParams();

    const [formData, setFormData] = useState({
        name: params.get('name'),
        age: params.get('age'),
        description: params.get('description'),
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
            <div className="absolute">{JSON.stringify(formData, null, 2)}</div>
            <AnimatePresence mode="wait">
                {[
                    <DogName
                        key="basicInfo"
                        {...{ formData, setFormData, nextStep }}
                    />,
                    <DogAge
                        key="moreInfo"
                        {...{ formData, setFormData, previousStep, nextStep }}
                    />,
                    <DogDescription
                        key="description"
                        {...{ formData, setFormData, previousStep, nextStep }}
                    />,
                ].filter((el, index) => index === step)}
            </AnimatePresence>
        </motion.main>
    );
};

export default withAuth(CreateDog, '/login?ref=create-dog');
