import { AiFillHome } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';

import {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { fetchUser } from '../../utils/user/userActions.js';
import { UserContext } from '../../context/UserContext.jsx';

const Nav = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const searchIn = useRef();
    const { user } = useContext(UserContext);

    return (
        <nav
            className={`fixed w-[calc(100%_-_2rem)] z-50 m-4 px-4 py-3 flex items-center  rounded-xl h-16 bg-gradient-to-br from-rose-400 to-red-500 shadow-xl font-brand`}
        >
            <Link to={'/alldogs'}>

                <span className={`text-3xl block text-slate-50`}>
                    <AiFillHome />
                </span>
            </Link>
            <div className={`flex items-center ml-auto`}>
                {/*Web Nav*/}
                <div className={`flex gap-2 items-center hidden md:flex`}>
                    {!user ? (
                        <>
                            <Link to={'/login'}>
                                <span className={`${styles.link}`}>Login</span>
                            </Link>
                            <Link to={'/register'}>
                                <span className={styles.link}>Register</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={'/profile'}>
                                <span className={styles.link}>Profile</span>
                            </Link>
                            <Link to={'/create-dog'}>
                                <span className={`${styles.link}`}>Add Dog</span>
                            </Link>

                            <Link to={'/create-event'}>
                                <span className={`${styles.link}`}>Create Event</span>
                            </Link>

                            <Link to={'/events'}>
                                <span className={`${styles.link}`}>Events</span>
                            </Link>

                            <Link to={'/logout'}>
                                <span className={styles.link}>Logout</span>
                            </Link>
                        </>
                    )}
                </div>

                {/*Mobile Nav*/}
                <div className="dropdown dropdown-end block md:hidden ">
                    <label
                        tabIndex="0"
                        className="btn btn-ghost btn-circle text-slate-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex="0"
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {!user ? (
                            <>
                                <li>
                                    <Link to={'/login'}>Log in</Link>
                                </li>
                                <li>
                                    <Link to={'/register'}>Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={'/profile'}>Profile</Link>
                                </li>
                                <li>
                                    <Link to={'/create-dog'}>Create Dog</Link>
                                </li>
                                <li>
                                    <Link to={'/create-event'}>Create Event</Link>
                                </li>
                                <li>
                                    <Link to={'/events'}>Events</Link>
                                </li>
                                <li>
                                    <Link to={'/logout'}>Logout</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;