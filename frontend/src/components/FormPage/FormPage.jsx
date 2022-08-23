import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { errorIcon } from '../icons/icons.jsx';
import Button from '../Button/Button.jsx';

const FormInputContainer = ({ label, children }) => {
    return (
        <div className="form-control w-full">
            <label className="label text-4xl font-brand font-bold pb-4">
                {label}
            </label>
            {children}
        </div>
    );
};

const FormPage = ({
    children,
    handleSubmit,
    setFormData,
    previousStep,
    nextStep,
    errors,
    last,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const errorMsgs = Object.values(errors).map((error) => error.message);
    const changeStep = useCallback(
        (direction) =>
            handleSubmit((data) => {
                setFormData((prev) => ({ ...prev, ...data }));
                const oldParams = Object.fromEntries(
                    new URLSearchParams(location.search)
                );
                // Adding the query parameters after each step to persist form data
                navigate({
                    search: `${createSearchParams({ ...oldParams, ...data })}`,
                });
                direction > 0 ? nextStep() : previousStep();
            })(),
        [handleSubmit, nextStep, setFormData, navigate]
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') changeStep(1);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [changeStep]);

    return (
        <div className={`relative my-auto mx-auto min-w-1/3`}>
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
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>
                                        {errorMsgs?.map((error) => (
                                            <div key={error}>{error}</div>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {children}
                <div className={`flex flex-wrap`}>
                    {previousStep && (
                        <Button onClick={() => changeStep(-1)}>Previous</Button>
                    )}
                    {nextStep && (
                        <Button onClick={() => changeStep(1)}>
                            {last ? 'Submit' : 'Next'}
                        </Button>
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

export { FormPage, FormInputContainer };
