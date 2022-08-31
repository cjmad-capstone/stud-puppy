import React, { useRef, useState } from 'react';
import Button from '../Button/Button.jsx';
import FormPage from '../Form/FormPage.jsx';
import { useValidate } from '../../utils/hooks/useValidate.js';
import * as yup from 'yup';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

const DogNameAndBreed = ({ changeStep, formData }) => {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');

    useQuery(
        ['breeds'],
        () =>
            fetch('https://dog.ceo/api/breeds/list/all').then((res) =>
                res.json()
            ),
        {
            onSuccess: (data) => {
                const breedsCombine = Object.entries(data.message).reduce(
                    (a, c) => {
                        if (c[1].length > 0) {
                            const names = c[1].map((name) => name + ' ' + c[0]);
                            return [...a, ...names];
                        }
                        return [...a, c[0]];
                    },
                    []
                );

                setBreeds(breedsCombine);
            },
        }
    );

    const { register, errors, handleSubmit } = useValidate({
        name: yup.string().required('Name is required'),
        breeds: yup
            .string()
            .required('Breed is required')
            .oneOf(breeds, 'Invalid breed selected'),
    });
    const _changeStep = (dir) =>
        handleSubmit((data) =>
            changeStep(dir, { ...data, breeds: [data.breeds] })
        )();

    return (
        <FormPage errors={errors}>
            <div className={`w-full`}>
                <label className="label">
                    <span className="label-text">What is your dog's name?</span>
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    defaultValue={formData?.name}
                    {...register('name')}
                    className="input input-bordered w-full"
                    autoFocus
                />
                <label className="label">
                    <span className="label-text">
                        What is your dog's breed?
                    </span>
                </label>

                <select
                    className="select select-secondary w-full"
                    {...register('breeds')}
                    defaultValue="DEFAULT"
                    onChange={(e) => setSelectedBreed(e.target.value)}
                >
                    <option value="DEFAULT" disabled>
                        Select a breed
                    </option>
                    {breeds?.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                </select>
                {selectedBreed && (
                    <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        href={`https://en.wikipedia.org/wiki/${selectedBreed}`}
                        target={'_blank'}
                        className={
                            'link hover:opacity-50 transition-all pt-2 block'
                        }
                    >
                        Learn more about {selectedBreed}s
                    </motion.a>
                )}
            </div>
            <Button onClick={() => _changeStep(1)}>Next</Button>
        </FormPage>
    );
};

export { DogNameAndBreed };
