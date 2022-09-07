import React, { useContext } from 'react';
import { FaEdit } from 'react-icons/all';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { authHeader } from '../../../utils/auth/authHeader.js';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../../context/UserContext.jsx';

const DogEditableField = ({ children, dog, defaultValue, EditComponent }) => {
    const [editIcon, setEditIcon] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    const { user } = useContext(UserContext);

    const onEdit = async (data) => {
        try {
            const res = await fetch(`/api/dogs/${dog.id}/edit`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify({ ...dog, ...data }),
            });
            await res.json();
            location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <span
                className={`relative`}
                onMouseOver={() => setEditIcon(true)}
                onMouseLeave={() => setEditIcon(false)}
            >
                {children}
                <AnimatePresence>
                    {editIcon && dog?.owner?.id === user?.id && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <FaEdit
                                className={`absolute cursor-pointer text-2xl top-0 right-0 -translate-y-full translate-x-full`}
                                onClick={() => setEditMode(true)}
                            />
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
            <AnimatePresence>
                {editMode && (
                    <EditComponent
                        onEdit={onEdit}
                        dog={dog}
                        defaultValue={defaultValue}
                        setOpen={setEditMode}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default DogEditableField;
