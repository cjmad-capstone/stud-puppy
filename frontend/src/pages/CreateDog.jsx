import {
    FormInputContainer,
    withFormPage,
} from '../components/MultiPartForm/MultiPartForm.jsx';
import * as yup from 'yup';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { pt } from '../utils/anim/pageTransitions.js';
import { AnimatePresence, motion } from 'framer-motion';

const DogName = withFormPage(({ register, formData }) => {
    return (
        <FormInputContainer label={"What's your dog's name?"}>
            <input
                className="input input-bordered input-secondary"
                defaultValue={formData?.name}
                {...register('name')}
            />
        </FormInputContainer>
    );
});
const DogAge = withFormPage(({ register, formData }) => {
    return (
        <FormInputContainer label={`How old is ${formData?.name}?`}>
            <input
                type="number"
                className="input input-bordered input-secondary"
                defaultValue={formData?.age}
                {...register('age')}
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
const CreateDog = () => {
    const [step, setStep] = useState(0);

    const [params] = useSearchParams();

    const [formData, setFormData] = useState({
        name: params.get('name'),
        age: params.get('age'),
        description: params.get('description'),
        location: params.get('location'),
        loveable: params.get('loveable'),
    });

    const pageProps = { step, setStep, formData, setFormData };
    return (
        <>
            <div className="absolute">{JSON.stringify(formData, null, 2)}</div>

            <motion.main
                {...pt}
                className={'w-full flex flex-col justify-center items-center'}
            >
                <form
                    className={`w-1/2 m-auto`}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <AnimatePresence mode="wait">
                        {[
                            <DogName
                                key="dog-name"
                                {...{
                                    ...pageProps,
                                    schema: { name: validationSchema.name },
                                }}
                            />,
                            <DogAge
                                key="dog-age"
                                {...{
                                    ...pageProps,
                                    schema: { age: validationSchema.age },
                                }}
                            />,
                            <DogDescription
                                key="dog-description"
                                {...{
                                    ...pageProps,
                                    schema: {
                                        description:
                                            validationSchema.description,
                                    },
                                }}
                            />,
                        ].filter((_, idx) => idx === step)}
                    </AnimatePresence>
                </form>
            </motion.main>
        </>
    );
};

export default CreateDog;
