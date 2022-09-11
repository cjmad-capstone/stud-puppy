import Modal from '../Modal/Modal.jsx';
import React from 'react';
import { authHeader } from '../../utils/auth/authHeader.js';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const DeleteEventModal = ({ event, setModalOpen, onDelete }) => {
    const navigate = useNavigate();

    const { mutate: deleteEvent } = useMutation(
        () =>
            fetch(`/api/events/${event?.id}`, {
                method: 'DELETE',
                headers: {
                    ...authHeader(),
                },
            }).then((res) => res.json()),
        {
            onSuccess: () => {
                setModalOpen(false);
                onDelete();
            },
            onError: (e) => {
                console.error(e);
                navigate('/error?status=403');
            },
        }
    );

    return (
        <Modal setOpen={setModalOpen} customButtons>
            <div
                className={
                    'bg-base-100 p-4 rounded-xl flex flex-col gap-4 items-center'
                }
            >
                <h1 className={`text-4xl font-bold `}>
                    Are you sure you want to delete {event?.name}?
                </h1>
                <div className={'flex gap-3'}>
                    <button
                        className={'btn btn-error'}
                        onClick={() => deleteEvent()}
                    >
                        Yes
                    </button>
                    <button
                        className={'btn btn-ghost bg-base-300'}
                        onClick={() => setModalOpen(false)}
                    >
                        Nevermind
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteEventModal;
