import { useValidate } from '../../utils/hooks/useValidate.js';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../Button/Button.jsx';
import { useCallback, useEffect, useRef } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import nav from '../Nav/Nav.jsx';

const FormInputContainer = ({ label, children, className }) => {
    return (
        <div className={`form-control ${className}`}>
            <label className="label text-4xl font-brand font-bold pb-6">
                {label}
            </label>
            {children}
        </div>
    );
};
const withFormPage =
    (Component) =>
    ({ schema, step, setStep, setFormData, onSubmit, ...rest }) => {
        const navigate = useNavigate();
        const { register, handleSubmit, errors } = useValidate({ ...schema });

        const errorMsgs = Object.values(errors).map((error) => error.message);

        const changeStep = (direction) => {
            handleSubmit((data) => {
                setFormData((prev) => ({ ...prev, ...data }));
                const oldParams = Object.fromEntries(
                    new URLSearchParams(location.search)
                );
                // Adding the query parameters after each step to persist form data
                navigate({
                    search: `${createSearchParams({
                        ...oldParams,
                        ...data,
                    })}`,
                });
                setStep((prev) => prev + direction);
            })();
        };

        const container = useRef();

        useEffect(() => {
            const handleEnter = (e) => {
                if (e.key === 'Enter') {
                    changeStep(1);
                }
            };
            document.addEventListener('keydown', handleEnter);
            return () => document.removeEventListener('keydown', handleEnter);
        }, []);

        return (
            <div className={`relative`} ref={container}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { delay: 0.25 } }}
                    className={`flex flex-col items-center gap-3 justify-center p-4 bg-base-100 rounded-xl`}
                >
                    <div>
                        <AnimatePresence>
                            {errorMsgs.length > 0 && (
                                <motion.div
                                    initial={{
                                        height: 0,
                                        opacity: 0,
                                        scaleY: 0,
                                    }}
                                    animate={{
                                        height: 'auto',
                                        opacity: 1,
                                        scaleY: 1,
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        scaleY: 0,
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
                                                    <div key={error}>
                                                        {error}
                                                    </div>
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Component register={register} {...rest} />
                    <div className={`flex flex-wrap`}>
                        {step !== 0 && (
                            <Button onClick={() => changeStep(-1)}>
                                Previous
                            </Button>
                        )}
                        <Button onClick={() => changeStep(1)}>
                            {onSubmit ? 'Submit' : 'Next'}
                        </Button>
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

export { withFormPage, FormInputContainer };
