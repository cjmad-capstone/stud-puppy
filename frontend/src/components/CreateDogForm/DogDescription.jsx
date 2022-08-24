import { useValidate } from '../../utils/hooks/useValidate.js';
import * as yup from 'yup';
import FormPage from '../Form/FormPage.jsx';
import React from 'react';
import Button from '../Button/Button.jsx';

const DogDescription = ({ changeStep, formData }) => {
    const { register, errors, handleSubmit } = useValidate({
        description: yup
            .string()
            .max(200, 'Description cannot be more than 200 chars')
            .required('Description is required'),
    });

    const _changeStep = (dir) =>
        handleSubmit((data) => changeStep(dir, data))();
    return (
        <FormPage errors={errors}>
            <div className="w-full">
                <label className="label">
                    <span className="label-text">
                        Tell us more about your dog...
                    </span>
                </label>
                <textarea
                    {...register('description')}
                    defaultValue={formData?.description}
                    className="textarea textarea-secondary w-full"
                ></textarea>
            </div>
            <div className={`flex`}>
                <Button onClick={() => _changeStep(-1)}>Previous</Button>
                <Button onClick={() => _changeStep(1)}>Next</Button>
            </div>
        </FormPage>
    );
};

export { DogDescription };
