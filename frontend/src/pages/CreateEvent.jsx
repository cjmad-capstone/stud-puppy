import Button from '../components/Button/Button.jsx';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { authHeader } from '../utils/auth/authHeader.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { pt } from '../utils/anim/pageTransitions.js';
import { motion } from 'framer-motion';
import { useValidate } from '../utils/hooks/useValidate.js';

const CreateEvent = () => {
    const navigate = useRef(useNavigate());

    const { register, errors, handleSubmit } = useValidate({
        name: yup.string().required(),
        description: yup.string().required(),
        date: yup.date(),
        time: yup.string(),
        location: yup.string().required(),
    });

    const createEvent = (eventObj) => {
        try {
            console.log(eventObj);
            fetch('/api/events', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify(eventObj),
            })
                .then((res) => res.json())
                .then((data) => {
                    // Go to the new event's profile if data submitted successfully
                    navigate.current('/events/' + data.id);
                    console.log(data);
                });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.main {...pt}>

        <div className={'flex flex-col items-center'}>
            <h1 className={`text-6xl font-brand font-bold`}>Create Event</h1>
            <form
                className={`flex flex-col items-center`}
                onSubmit={handleSubmit((data) => {
                    createEvent(data);
                })}
                className={`w-1/2`}
            >
                <div className={`w-full`}>
                    <label
                        htmlFor="name"
                        className={`label label-text-alt`}
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        {...register('name')}
                        name="name"
                        id="name"
                        className={`w-full input input-bordered input-secondary rounded-full'`}
                    />
                </div>
                {errors?.name && <p>{errors.name.message}</p>}
                <div className={`w-full`}>
                    <label
                        htmlFor="description"
                        className={`label label-text-alt`}
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        {...register('description')}
                        name="description"
                        id="description"
                        className={`w-full input input-bordered input-secondary rounded-full'`}
                    />
                </div>
                {errors?.description && <p>{errors.description.message}</p>}
                <div className={`w-full`}>
                    <label
                        htmlFor="date"
                        className={`label label-text-alt`}
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        {...register('date')}
                        name="date"
                        id="date"
                        className={`w-full input input-bordered input-secondary rounded-full`}
                    />
                </div>
                {errors?.date && <p>{errors.date.message}</p>}
                <div className={`w-full`}>
                    <label
                        htmlFor="time"
                        className={`label label-text-alt`}
                    >
                        Time
                    </label>
                    <input
                        type="time"
                        {...register('time')}
                        name="time"
                        id="time"
                        className={`w-full input input-bordered input-secondary rounded-full`}
                    />
                </div>
                {errors?.time && <p>{errors.time.message}</p>}
                <div className={`w-full`}>
                    <label
                        htmlFor="location"
                        className={`label label-text-alt`}
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        {...register('location')}
                        name="location"
                        id="location"
                        className={`w-full input input-bordered input-secondary rounded-full`}
                    />
                </div>
                {errors?.location && <p>{errors.location.message}</p>}
                <Button
                    type="submit"
                    className={`w-full p-2 border border-brand rounded-lg`}
                >
                    Create Event
                </Button>
            </form>
        </div>
        </motion.main>

    );
};

export default CreateEvent;
