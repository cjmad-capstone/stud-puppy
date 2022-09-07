import React, { useRef } from 'react';
import { useValidate } from '../../utils/hooks/useValidate.js';
import { dogSchema } from '../CreateDogForm/dogSchema';
import Modal from '../Modal/Modal.jsx';

const EditName = ({ defaultValue, setOpen, onEdit }) => {
    const { register, handleSubmit, errors } = useValidate({
        name: dogSchema.name,
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
