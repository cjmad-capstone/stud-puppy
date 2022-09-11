import { useValidate } from '../../utils/hooks/useValidate.js';
import PageWrapper from './PageWrapper.jsx';
import React from 'react';
import Button from '../Button/Button.jsx';
import { dogSchema } from '../../utils/dogSchema.js';

const DogDescription = ({ changeStep, formData }) => {
    const { register, errors, handleSubmit } = useValidate({
        description: dogSchema.description,
    });

    const _changeStep = (dir) =>
        handleSubmit((data) => changeStep(dir, data))();
    return (
        <PageWrapper errors={errors}>
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
                    autoFocus
                ></textarea>
            </div>
            <div className={`flex flex-wrap justify-center`}>
                <Button onClick={() => _changeStep(-1)}>Previous</Button>
                <Button onClick={() => _changeStep(1)}>Next</Button>
            </div>
        </PageWrapper>
    );
};

export { DogDescription };
