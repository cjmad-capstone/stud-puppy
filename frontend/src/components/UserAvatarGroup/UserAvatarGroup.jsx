import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';

const UserAvatarGroup = ({ users, avatarSize = '6rem' }) => {
    return (
        <AnimatePresence>
            {users.map((user, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="avatar placeholder"
                >
                    <div
                        className="font-bold bg-neutral-focus text-base-100 bg-cover"
                        style={{
                            backgroundImage: user?.img
                                ? `url(${FILESTACK_ENDPOINT}/${user?.img})`
                                : 'unset',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    >
                        <Link to={`/users/${user.id}`}>
                            <span
                                style={{
                                    textShadow: '0 0 0.5rem black',
                                }}
                            >
                                {user.username}
                            </span>
                        </Link>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

export default UserAvatarGroup;
