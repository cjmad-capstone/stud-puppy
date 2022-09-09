import React from 'react';
import Button from '../Button/Button.jsx';
import FormPage from '../Form/FormPage.jsx';
import { useValidate } from '../../utils/hooks/useValidate.js';
import { useZip } from '../../utils/hooks/useZip.js';
import { dogSchema } from './dogSchema.js';

const DogDOBAndZip = ({ changeStep, formData }) => {
    const { register, errors, handleSubmit } = useValidate({
        dob: dogSchema.dob,
        zipCode: dogSchema.zipCode,
    });

    const [zip, errs] = useZip();

    const _changeStep = (dir) =>
        handleSubmit((data) => changeStep(dir, data))();

    return (
        <FormPage errors={errors}>
            <div className={`w-full`}>
                <label className="label">
                    <span className="label-text">
                        When was {formData?.name} born?
                    </span>
                </label>
                <input
                    type="date"
                    placeholder="Type here"
                    {...register('dob')}
                    className="input input-bordered w-full"
                    autoFocus
                />
            </div>
            <div className={`w-full`}>
                <label className="label">
                    <span className="label-text">
                        Where is {formData?.name} located (Zip code)
                    </span>
                </label>
                <input
                    type="text"
                    placeholder="Zip Code"
                    defaultValue={formData?.zipCode || zip}
                    {...register('zipCode')}
                    className="input input-bordered w-full"
                />
            </div>
            <div className={`flex flex-wrap justify-center`}>
                <Button onClick={() => _changeStep(-1)}>Previous</Button>
                <Button onClick={() => _changeStep(1)}>Next</Button>
            </div>
        </FormPage>
    );
};

export { DogDOBAndZip };
