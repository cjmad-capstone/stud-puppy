import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    >
                        <Link to={`/users/${user.id}`}>
                            <span>{user.username}</span>
                        </Link>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

export default UserAvatarGroup;
