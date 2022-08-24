import {
    FormInputContainer,
    withFormPage,
} from '../components/MultiPartForm/MultiPartForm.jsx';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { pt } from '../utils/anim/pageTransitions.js';
import { AnimatePresence, motion } from 'framer-motion';
import { authHeader } from '../utils/auth/authHeader.js';
import { withAuth } from '../utils/auth/withAuth.jsx';
import FileDropzone from '../components/FileDropzone/FileDropzone.jsx';
import { parseDateString } from '../utils/date/index.js';

const DogName = withFormPage(({ register, formData }) => {
    return (
        <FormInputContainer label={"What's your dog's name?"}>
            <label className="label">
                <span className="label-text">Name:</span>
            </label>
            <input
                className="input input-bordered input-secondary"
                autoFocus
                defaultValue={formData?.name}
                {...register('name')}
            />
        </FormInputContainer>
    );
});
const DogSexAndWeight = withFormPage(({ register, formData }) => {
    return (
        <FormInputContainer label={`Tell us some more about ${formData?.name}`}>
            <div
                className={`w-3/4 border-primary mx-auto p-4 flex flex-col gap-2`}
            >
                <label className="label">
                    <span className="label-text">Gender:</span>
                </label>
                <div className="form-control border-secondary border-2 rounded-full px-3">
                    <label className="label cursor-pointer">
                        <span className="label-text">F</span>
                        <input
                            type="radio"
                            {...register('sex')}
                            className="radio checked:bg-secondary"
                            value="F"
                            defaultChecked={formData?.sex === 'F'}
                        />
                    </label>
                </div>
                <div className="form-control border-primary border-2 rounded-full px-3">
                    <label className="label cursor-pointer">
                        <span className="label-text">M</span>
                        <input
                            type="radio"
                            {...register('sex')}
                            value="M"
                            className="radio checked:bg-primary"
                            defaultChecked={formData?.sex === 'M'}
                        />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">Weight(lbs)</label>
                    <input
                        className="input input-bordered input-secondary"
                        type="number"
                        {...register('weight')}
                        defaultValue={formData?.weight}
                    />
                </div>
            </div>
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
            {formData?.dob}
            {/*{formData.dob && format(parseISO(formData?.dob), 'MM/dd/yyyy')}*/}
            <input
                type={'date'}
                className="textarea textarea-secondary"
                // defaultValue={
                //     formData.dob &&
                //     format(parseISO(formData?.dob), 'yyyy-mm-dd')
                // }
                {...register('dob')}
            />
        </FormInputContainer>
    );
});
const DogPhotos = withFormPage(({ setFormData, formData, setCustomErrors }) => {
    // const [files, setFiles] = useState([]);

    useEffect(() => {
        setCustomErrors({
            noFiles: { message: 'Please upload at least one photo' },
        });
    }, [setCustomErrors]);

    const onDrop = (f) => {
        if (f.length > 0) setCustomErrors({});

        setFormData({ ...formData, files: f });
    };
    return (
        <FormInputContainer label={`Upload some photos of ${formData?.name}`}>
            <FileDropzone
                onDrop={onDrop}
                setErrors={setCustomErrors}
                maxFileSize={5000}
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
    sex: yup.string(),
    weight: yup
        .number()
        .typeError('Weight must be a number')
        .max(200, "Weight can't be more than 200 lbs"),
    breed: yup.string().required('Breed is required'),
    dob: yup
        .date()
        .transform(parseDateString)
        .typeError('Date of birth must be in format mm/dd/yyyy')
        .max(new Date())
        .required('Date of birth is required'),
};
const CreateDog = () => {
    const [step, setStep] = useState(0);
    const navigate = useRef(useNavigate());

    const [params] = useSearchParams();

    const [formData, setFormData] = useState({
        name: params.get('name'),
        description: params.get('description'),
        sex: params.get('sex'),
        dob: params.get('dob'),
        weight: params.get('weight'),
        img: params.get('img') ?? 'test',
        loveable: params.get('loveable') ?? false,
    });

    const mainRef = useRef();

    useEffect(() => {
        const scrollTo = setTimeout(
            () => mainRef.current?.scrollIntoView(),
            1000
        );

        return () => clearTimeout(scrollTo);
    }, [mainRef]);

    const pageProps = { step, setStep, formData, setFormData };

    const steps = [
        <DogPhotos key="dog-photos" />,
        <DogName
            key="dog-name"
            schema={{ name: validationSchema.name, sex: validationSchema.sex }}
        />,
        <DogSexAndWeight
            key="dog-sex-weight"
            schema={{
                sex: validationSchema.sex,
                weight: validationSchema.weight,
            }}
        />,
        <DogDOB
            key="dog-dob"
            schema={{
                dob: validationSchema.dob,
            }}
        />,
        <DogDescription
            key="dog-description"
            schema={{
                description: validationSchema.description,
            }}
        />,
    ];

    useEffect(() => {
        const submitForm = () => {
            console.log(step);
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
    }, [formData, navigate, step, steps.length]);

    return (
        <>
            <div className="absolute">{JSON.stringify(formData, null, 2)}</div>

            <motion.main
                {...pt}
                ref={mainRef}
                className={'w-full flex flex-col justify-center items-center'}
            >
                <AnimatePresence mode="wait">
                    {steps.map((comp, idx) => {
                        return (
                            idx === step &&
                            React.cloneElement(comp, {
                                ...pageProps,
                                last: idx === steps.length - 1,
                            })
                        );
                    })}
                </AnimatePresence>
            </motion.main>
        </>
    );
};

export default withAuth(CreateDog, '/login?ref=create-dog');
