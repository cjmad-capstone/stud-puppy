import Button from '../components/Button/Button.jsx';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    authenticateUser,
    fetchUser,
    registerUser,
} from '../utils/user/userActions.js';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../context/UserContext.jsx';

const Login = () => {
    const [customErrors, setCustomErrors] = useState({});
    const navigate = useNavigate();

    const [params] = useSearchParams();

    const schema = yup
        .object({
            username: yup.string().required('Username is required'),
            password: yup.string().required('Password is required'),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const userContext = useContext(UserContext);

    return (
        <motion.main className={`flex flex-col items-center`} {...pt}>
            <h1 className={`text-6xl font-brand font-bold`}>Login</h1>
            <motion.div className={'w-1/2'} layout>
                {Object.keys({ ...errors, ...customErrors }).length > 0 && (
                    <motion.div
                        className="alert alert-error shadow-lg my-4"
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
                                {Object.entries({
                                    ...errors,
                                    ...customErrors,
                                }).map((el, idx) => (
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
                        try {
                            await authenticateUser({
                                ...data,
                            });
                            const localUser = await fetchUser();
                            userContext.setUser(localUser);

                            navigate(
                                params.get('ref')
                                    ? '/' + params.get('ref')
                                    : '/profile'
                            );
                        } catch (err) {
                            setCustomErrors({
                                error: { message: 'Credentials invalid' },
                            });
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
                    <div className={`pt-2`}>
                        <span className={`text-sm text-gray-600`}>
                            Don't have an account?&nbsp;
                            <Link to="/register" className={`link`}>
                                Register Here
                            </Link>
                        </span>
                    </div>
                    <Button>Login</Button>
                </form>
            </motion.div>
        </motion.main>
    );
};

export default Login;
