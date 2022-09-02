
import React from 'react';
import Button from '../Button/Button.jsx';
import FormPage from '../Form/FormPage.jsx';
import { useValidate } from '../../utils/hooks/useValidate.js';
import * as yup from 'yup';

const DogNameEdit = ({ changeStep, formData }) => {
    const { register, errors, handleSubmit } = useValidate({
        name: yup.string().required('Name is required'),
    });

    const _changeStep = (dir) =>
        handleSubmit((data) => changeStep(dir, data))();

    return (
        <FormPage errors={errors}>
            <div className={`w-full`}>
                <label className="label">
                    <span className="label-text">What is your dog's name?</span>
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    defaultValue={formData?.name}
                    {...register('name')}
                    className="input input-bordered w-full"
                    autoFocus
                />
            </div>
            <Button onClick={() => _changeStep(1)}>Next</Button>
        </FormPage>
    );
};

export { DogNameEdit };