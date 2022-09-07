import React, { useRef } from 'react';
import { useValidate } from '../../../utils/hooks/useValidate.js';
import { dogSchema } from '../../CreateDogForm/dogSchema.js';
import Modal from '../../Modal/Modal.jsx';
import { eventSchema } from '../../../utils/eventSchema.js';

const EditName = ({ defaultValue, setOpen, onEdit }) => {
    const { register, handleSubmit, errors } = useValidate({
        description: eventSchema.description,
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
                <span className="label-text-alt">Description:</span>
            </label>
            <textarea
                {...register('description')}
                placeholder="Description"
                className={`w-full textarea textarea-bordered textarea-secondary  ${
                    errors.description ? 'input-error' : ''
                }`}
            >
                {defaultValue}
            </textarea>
        </Modal>
    );
};

export default EditName;
