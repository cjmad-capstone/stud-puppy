import Button from '../components/Button/Button.jsx';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/global.js';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { registerUser } from '../utils/user/userActions.js';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useZip } from '../utils/hooks/useZip.js';

const Login = () => {
    const [error, setError] = useState();

    const navigate = useNavigate();
    const [files, setFiles] = React.useState([]);

    const [zip, errs] = useZip();

    const schema = yup
        .object({
            username: yup
                .string()
                .required('Username is required')
                .min(3, 'Username must be at least 3 characters long')
                .max(20, 'Username must be less than 20 characters long'),
            email: yup
                .string()
                .required('Email is required')
                .email('Email is invalid'),
            zipCode: yup
                .number()
                .typeError('Zipcode must be a number')
                .required('Zip code is required'),
            password: yup.string().required('Password is required'),
            passwordConfirm: yup
                .string()
                .required('Password confirmation is required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    return (
        <motion.main className={`flex flex-col items-center px-6`} {...pt}>
            <h1 className={`text-6xl font-brand font-bold`}>Register</h1>
            <motion.div className={'w-full md:w-1/2'} layout>
                {(Object.keys(errors).length > 0 || error) && (
                    <motion.div
                        className="alert items-start alert-error shadow-lg my-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
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
                                {error ??
                                    Object.entries(errors).map((el, idx) => (
                                        <span key={idx}>
                                            {el[1].message}
                                            <br />
                                        </span>
                                    ))}
                            </span>
                        </div>
                    </motion.div>
                )}
                <form
                    className={`flex flex-col items-center`}
                    onSubmit={handleSubmit(async (data) => {
                        const res = await registerUser({
                            ...data,
                        });
                        if (!res.error) {
                            navigate('/login');
                        } else {
                            setError(res.error);
                        }
                    })}
                >
                    <div className={`w-full`}>
                        <label className="label">
                            <span className="label-text-alt">Username:</span>
                        </label>
                        <input
                            type="text"
                            {...register('username')}
                            placeholder="Username"
                            className={`w-full input input-bordered input-secondary rounded-full ${
                                errors.username ? 'input-error' : ''
                            }`}
                        />
                    </div>
                    <div className={`w-full`}>
                        <label className="label">
                            <span className="label-text-alt">Email:</span>
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            placeholder="Email"
                            className={`w-full input input-bordered input-secondary rounded-full ${
                                errors.email ? 'input-error' : ''
                            }`}
                        />
                    </div>
                    <div className={`w-full`}>
                        <label className="label">
                            <span className="label-text-alt">Zip code:</span>
                        </label>
                        <input
                            type="text"
                            {...register('zipCode')}
                            placeholder="Zip Code"
                            defaultValue={zip}
                            className={`w-full input input-bordered input-secondary rounded-full ${
                                errors.zipCode ? 'input-error' : ''
                            }`}
                        />
                    </div>
                    <div className={`w-full`}>
                        <label className="label">
                            <span className="label-text-alt">Password:</span>
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            placeholder="Password"
                            className={`w-full input input-bordered input-secondary rounded-full ${
                                errors.password ? 'input-error' : ''
                            }`}
                        />
                    </div>
                    <div className={`w-full`}>
                        <label className="label">
                            <span className="label-text-alt">
                                Confirm Password:
                            </span>
                        </label>
                        <input
                            type="password"
                            {...register('passwordConfirm')}
                            placeholder="Confirm Password"
                            className={`w-full input input-bordered input-secondary rounded-full ${
                                errors.passwordConfirm ? 'input-error' : ''
                            }`}
                        />
                    </div>

                    <div className={`pt-2`}>
                        <span className={`text-sm text-gray-600`}>
                            Already have an account?&nbsp;
                            <Link to="/login" className={`link`}>
                                Log In Here
                            </Link>
                        </span>
                    </div>

                    <Button>Register</Button>
                </form>
            </motion.div>
        </motion.main>
    );
};

export default Login;
