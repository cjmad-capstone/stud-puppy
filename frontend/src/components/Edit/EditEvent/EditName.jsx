import React, { useRef } from 'react';
import { useValidate } from '../../../utils/hooks/useValidate.js';
import { dogSchema } from '../../CreateDogForm/dogSchema.js';
import Modal from '../../Modal/Modal.jsx';
import { eventSchema } from '../../../utils/eventSchema.js';

const EditName = ({ defaultValue, setOpen, onEdit }) => {
    const { register, handleSubmit, errors } = useValidate({
        name: eventSchema.name,
    });

    return (
        <Modal
            setOpen={setOpen}
            onPositive={handleSubmit(onEdit)}
            onNegative={() => {}}
            positiveText="Save"
            negativeText="Cancel"
        >
            <label className="label">
                <span className="label-text-alt">Name:</span>
            </label>
            <input
                type="text"
                defaultValue={defaultValue}
                {...register('name')}
                placeholder="Name"
                className={`w-full input input-bordered input-secondary  ${
                    errors.name ? 'input-error' : ''
                }`}
            />
        </Modal>
    );
};

export default EditName;