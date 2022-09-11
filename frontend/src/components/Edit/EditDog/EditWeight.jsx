import React from 'react';
import { useValidate } from '../../../utils/hooks/useValidate.js';
import { dogSchema } from '../../../utils/dogSchema.js';
import Modal from '../../Modal/Modal.jsx';

const EditName = ({ defaultValue, setOpen, onEdit }) => {
    const { register, handleSubmit, errors } = useValidate({
        weight: dogSchema.weight,
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
                <span className="label-text-alt">Weight:</span>
            </label>
            <input
                type="number"
                defaultValue={defaultValue}
                {...register('weight')}
                placeholder="Weight"
                className={`w-full input input-bordered input-secondary  ${
                    errors.weight ? 'input-error' : ''
                }`}
            />
        </Modal>
    );
};

export default EditName;
