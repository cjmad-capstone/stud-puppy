import React from 'react';
import { useValidate } from '../../../utils/hooks/useValidate.js';
import Modal from '../../Modal/Modal.jsx';
import { eventSchema } from '../../../utils/eventSchema.js';

const EditName = ({ defaultValue, setOpen, onEdit }) => {
    const { register, handleSubmit, errors } = useValidate({
        date: eventSchema.date,
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
                <span className="label-text-alt">Date</span>
            </label>
            <input
                type="date"
                defaultValue={defaultValue}
                {...register('date')}
                placeholder="Date"
                className={`w-full textarea textarea-bordered textarea-secondary  ${
                    errors.date ? 'input-error' : ''
                }`}
            />
        </Modal>
    );
};

export default EditName;
