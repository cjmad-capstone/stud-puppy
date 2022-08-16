import Button from '../components/Button/Button.jsx';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useRef } from 'react';
import { authenticateUser } from '../utils/user/userActions.js';

const Login = () => {
    const username = useRef();
    const password = useRef();


    return (
        <motion.main className={`flex flex-col items-center`} {...pt}>
            <h1 className={`text-6xl font-brand font-bold`}>Login</h1>
            <form className={`w-1/2 flex flex-col items-center`}
                  onSubmit={async (e) => {
                      e.preventDefault();
                      await authenticateUser(username.current?.value, password.current?.value);
                  }}
            >
                <div className={`w-full`}>
                    <label className="label">
                        <span className="label-text-alt">Username:</span>
                    </label>
                    <input type="text" ref={username} placeholder="Username" name="username" className="w-full input input-bordered input-secondary rounded-full"/>
                </div>
                <div className={`w-full`}>
                    <label className="label">
                        <span className="label-text-alt">Password:</span>
                    </label>
                    <input type="text" ref={password} placeholder="Password" name="password" className="w-full input input-bordered input-secondary rounded-full"/>
                </div>
                <Button>
                    Continue
                </Button>
            </form>
        </motion.main>
    );
};

export default Login;