import Button from '../components/Button/Button.jsx';
import React, { useRef } from 'react';
import { authHeader } from '../utils/auth/authHeader.js';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { pt } from '../utils/anim/pageTransitions.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useValidate } from '../utils/hooks/useValidate.js';
import * as _ from 'lodash';
import { eventSchema } from '../utils/eventSchema.js';

const CreateEvent = () => {
    const navigate = useRef(useNavigate());

    const { register, errors, handleSubmit } = useValidate(eventSchema);

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
                <h1 className={`text-6xl font-brand font-bold`}>
                    Host an Event!
                </h1>
                <form
                    className={`flex flex-col items-center w-1/2`}
                    onSubmit={handleSubmit((data) => {
                        createEvent(data);
                    })}
                >
                    <AnimatePresence>
                        {!_.isEmpty(errors) && (
                            <motion.div
                                className={'w-full'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="alert alert-error shadow-lg flex flex-col items-start gap-0">
                                    <AnimatePresence>
                                        {Object.values(errors).map(
                                            (error, i) => (
                                                <motion.div
                                                    key={error.message}
                                                    initial={{
                                                        opacity: 0,
                                                        height: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        height: 'auto',
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        height: 0,
                                                        y: -10,
                                                    }}
                                                >
                                                    {error.message}
                                                </motion.div>
                                            )
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                    <div className={`w-full`}>
                        <label
                            htmlFor="date"
                            className={`label label-text-alt`}
                        >
                            Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            {...register('date')}
                            name="date"
                            id="date"
                            className={`w-full input input-bordered input-secondary rounded-full`}
                        />
                    </div>
                    <div className={`w-full`}>
                        <label
                            htmlFor="zipCode"
                            className={`label label-text-alt`}
                        >
                            Location (Zip Code)
                        </label>
                        <input
                            type="text"
                            {...register('zipCode')}
                            name="zipCode"
                            id="zipCode"
                            className={`w-full input input-bordered input-secondary rounded-full`}
                        />
                    </div>
                    <Button type="submit" className={`w-full my-4 `}>
                        Create Event
                    </Button>
                </form>
            </div>
        </motion.main>
    );
};

export default CreateEvent;
