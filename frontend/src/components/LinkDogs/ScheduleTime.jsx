import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button/Button.jsx';
import { useValidate } from '../../utils/hooks/useValidate.js';
import * as yup from 'yup';
import Loading from 'react-loading';
import { authHeader } from '../../utils/auth/authHeader.js';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const ScheduleTime = ({ userDog, dogToLink }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [date, setDate] = useState();

    const navigate = useNavigate();

    const { register, errors, handleSubmit } = useValidate({
        date: yup
            .date()
            .min(new Date(), 'Date must be in the future')
            .required('Date is required'),
    });
    const onSuccess = useCallback(
        async (data) => {
            setIsSubmitting(true);
            try {
                const resp = await fetch('/api/dogs/link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeader(),
                    },
                    body: JSON.stringify({
                        userDogId: userDog.id,
                        dogToLinkId: dogToLink.id,
                        date: data.date,
                    }),
                });
                const json = await resp.json();
                _.delay(() => setSuccessfullySubmitted(true), 1000);
                _.delay(() => navigate(`/events/${json.id}`), 500);
            } catch (err) {
                console.error(err);
                _.delay(() => setError(true), 1000);
            }
        },
        [dogToLink.id, userDog.id]
    );
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`flex flex-col gap-2 justify-center items-center`}
        >
            {!isSubmitting ? (
                <>
                    <h1 className={``}>
                        What time would you like to link with {dogToLink.name}
                    </h1>
                    <div className={`w-full`}>
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                        <input
                            type="date"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            {...register('date')}
                            autoFocus
                        />
                        {errors?.date && (
                            <p className="text-red-500">
                                {errors.date.message}
                            </p>
                        )}
                    </div>
                    <Button
                        onClick={handleSubmit(async (data) => {
                            await onSuccess(data);
                        })}
                    >
                        Submit
                    </Button>
                </>
            ) : (
                <>
                    {!successfullySubmitted ? (
                        <>
                            <h1
                                className={`text-4xl font-brand font-bold ${
                                    error ? 'text-red-700' : ''
                                }`}
                            >
                                {!error
                                    ? `Scheduling Event...`
                                    : 'Something went wrong :('}
                            </h1>
                            {!error && <Loading type="bubbles" color="black" />}
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-brand font-bold">
                                Done!
                            </h1>
                        </>
                    )}
                </>
            )}
        </motion.div>
    );
};

export default ScheduleTime;
