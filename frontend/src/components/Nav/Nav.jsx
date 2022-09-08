import { AiFillHome } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { HiUserCircle } from 'react-icons/hi';

import React, {
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
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';

const Nav = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const searchIn = useRef();
    const { user } = useContext(UserContext);

    return (
        <nav
            className={`fixed w-[calc(100%_-_2rem)] z-50 m-4 px-4 py-3 flex items-center  rounded-xl h-16 bg-gradient-to-br from-rose-400 to-red-500 shadow-xl font-medium font-brand`}
        >
            <Link to={'/'}>
                <span className={`text-3xl block text-slate-50`}>
                    <AiFillHome />
                </span>
            </Link>
            <div className={`flex items-center ml-auto`}>
                {/*Web Nav*/}
                <div className={`flex gap-5 items-center hidden md:flex`}>
                    {!user ? (
                        <>
                            <Link to={'/events'}>
                                <span className={`text-xl block text-slate-50`}>
                                    Events
                                </span>
                            </Link>
                            <Link to={'/alldogs'}>
                                <span className={`text-xl block text-slate-50`}>
                                    View Dogs
                                </span>
                            </Link>
                            <Link to={'/about'}>
                                <span className={`text-xl block text-slate-50`}>
                                    About Us
                                </span>
                            </Link>
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="text-3xl block text-slate-50"
                                >
                                    <img
                                        className={`rounded-full w-10 h-10`}
                                        src={`img/placholder-img.jpeg`}
                                    />
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                                >
                                    <li>
                                        <a href={'/login'}>Login</a>
                                    </li>
                                    <li>
                                        <a href={'/register'}>Register</a>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to={'/events'}>
                                <span className={`text-xl block text-slate-50`}>
                                    Events
                                </span>
                            </Link>
                            <Link to={'/alldogs'}>
                                <span className={`text-xl block text-slate-50`}>
                                    View Dogs
                                </span>
                            </Link>
                            <Link to={'/about'}>
                                <span className={`text-xl block text-slate-50`}>
                                    About Us
                                </span>
                            </Link>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0}>
                                    <img
                                        className={`rounded-full w-10 h-10`}
                                        src={
                                            user?.img
                                                ? `${FILESTACK_ENDPOINT}/${user.img}`
                                                : '/img/placholder-img.jpeg'
                                        }
                                    />
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                                >
                                    <li>
                                        <Link to={'/profile'}>
                                            View Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/create-event'}>
                                            Create Event
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/create-dog'}>Add Dog</Link>
                                    </li>
                                    <li>
                                        <Link to={'/logout'}>Logout</Link>
                                    </li>
                                </ul>
                            </div>
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
                        <li>
                            <Link to={'/events'}>Events</Link>
                        </li>
                        <li>
                            <Link to={'/alldogs'}>View Dogs</Link>
                        </li>
                        <li>
                            <Link to={'/about'}>About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="text-3xl block text-slate-50">
                    <img
                        className={`rounded-full w-10 h-10`}
                        src={
                            user?.img
                                ? `${FILESTACK_ENDPOINT}/${user.img}`
                                : 'img/placholder-img.jpeg'
                        }
                    />
                </label>
                <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                    {!user ? (
                        <>
                            <li>
                                <a href={'/login'}>Login</a>
                            </li>
                            <li>
                                <a href={'/register'}>Register</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to={'/profile'}>View Profile</Link>
                            </li>
                            <li>
                                <Link to={'/create-event'}>Create Event</Link>
                            </li>
                            <li>
                                <Link to={'/create-dog'}>Add Dog</Link>
                            </li>
                            <li>
                                <Link to={'/logout'}>Logout</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
