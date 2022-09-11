import React from 'react';
import { useValidate } from '../../../utils/hooks/useValidate.js';
import { dogSchema } from '../../../utils/dogSchema.js';
import Modal from '../../Modal/Modal.jsx';

const EditName = ({ defaultValue, setOpen, onEdit }) => {
    const { register, handleSubmit, errors } = useValidate({
        description: dogSchema.description,
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
