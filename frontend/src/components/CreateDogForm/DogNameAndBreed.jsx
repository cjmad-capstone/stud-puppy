import React, { useRef, useState } from 'react';
import Button from '../Button/Button.jsx';
import FormPage from '../Form/FormPage.jsx';
import { useValidate } from '../../utils/hooks/useValidate.js';
import * as yup from 'yup';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import MultiSelect from '../MultiSelect/MultiSelect.jsx';
import { createDogSchema } from './createDogSchema.js';

const DogNameAndBreed = ({ changeStep, formData }) => {
    const [breeds, setBreeds] = useState([]);

    const [selectedBreeds, setSelectedBreeds] = useState([]);

    useQuery(
        ['breeds'],
        () =>
            fetch('https://dog.ceo/api/breeds/list/all').then((res) =>
                res.json()
            ),
        {
            onSuccess: (data) => {
                // Breeds returns as an object with breed names as keys and an array of sub-breeds as values
                // flatten this into an array of strings
                // ex. bulldog: ['french', 'english'] -> ['french bulldog', 'english bulldog']
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
        name: createDogSchema.name,
    });

    const [customErrs, setCustomErrs] = useState({});

    const _changeStep = (dir) =>
        handleSubmit((data) => {
            // Custom error handling for breeds.
            // Ensure a breed is selected
            if (selectedBreeds.length < 1)
                return setCustomErrs({
                    breeds: { message: 'Please select at least one breed' },
                });

            changeStep(dir, { ...data, breeds: [...selectedBreeds] });
        })();

    return (
        <FormPage errors={{ ...errors, ...customErrs }}>
            <motion.div className={`w-full`}>
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

                <MultiSelect
                    setValues={setSelectedBreeds}
                    options={breeds}
                    label={'Select all breeds that apply'}
                />
            </motion.div>
            <Button onClick={() => _changeStep(1)}>Next</Button>
        </FormPage>
    );
};

export { DogNameAndBreed };
