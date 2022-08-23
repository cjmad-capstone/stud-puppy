import {
    FormInputContainer,
    withFormPage,
} from '../components/MultiPartForm/MultiPartForm.jsx';
import * as yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { pt } from '../utils/anim/pageTransitions.js';
import { AnimatePresence, motion } from 'framer-motion';
import { authHeader } from '../utils/auth/authHeader.js';
import { parseDateString } from '../utils/date/index.js';
import { flushSync } from 'react-dom';

const DogName = withFormPage(({ register, formData }) => {
    return (
        <FormInputContainer label={"What's your dog's name?"}>
            <input
                className="input input-bordered input-secondary"
                autoFocus
                defaultValue={formData?.name}
                {...register('name')}
            />
        </FormInputContainer>
    );
});

const DogDescription = withFormPage(({ register, formData }) => {
    return (
        <FormInputContainer
            label={`Tell us a little more about your furry friend`}
        >
            <textarea
                className="textarea textarea-secondary"
                defaultValue={formData?.description}
                {...register('description')}
            />
        </FormInputContainer>
    );
});
const DogDOB = withFormPage(({ register, formData }) => {
    return (
        <FormInputContainer label={`What's ${formData?.name}'s date of birth?`}>
            <input
                type={'date'}
                className="textarea textarea-secondary"
                defaultValue={formData?.dob}
                {...register('dob')}
            />
        </FormInputContainer>
    );
});

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
    dob: yup.date().max(new Date()).required('Date of birth is required'),
};
const CreateDog = () => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const [params] = useSearchParams();

    const [formData, setFormData] = useState({
        name: params.get('name'),
        description: params.get('description'),
        sex: params.get('sex') ?? 'F',
        dob: params.get('dob'),
        weight: params.get('weight') ?? 10,
        img: params.get('img') ?? 'test',
        loveable: params.get('loveable') ?? false,
    });

    const onSubmit = () => {
        console.log(formData);
        // fetch('/api/dogs', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         ...authHeader(),
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((res) => res.json())
        //     .then((data) => console.log(data));

        // navigate('/');
    };

    const pageProps = { step, setStep, formData, setFormData };
    return (
        <>
            <div className="absolute">{JSON.stringify(formData, null, 2)}</div>

            <motion.main
                {...pt}
                className={'w-full flex flex-col justify-center items-center'}
            >
                <AnimatePresence mode="wait">
                    {[
                        <DogName
                            key="dog-name"
                            {...pageProps}
                            schema={{ name: validationSchema.name }}
                        />,
                        <DogDescription
                            key="dog-description"
                            {...pageProps}
                            schema={{
                                description: validationSchema.description,
                            }}
                        />,
                        <DogDOB
                            key="dog-dob"
                            {...pageProps}
                            schema={{
                                dob: validationSchema.dob,
                            }}
                            onSubmit={() => onSubmit()}
                        />,
                    ].filter((_, idx) => idx === step)}
                </AnimatePresence>
            </motion.main>
        </>
    );
};

export default CreateDog;
