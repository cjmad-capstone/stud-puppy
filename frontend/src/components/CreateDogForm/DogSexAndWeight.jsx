import React from 'react';
import Button from '../Button/Button.jsx';
import PageWrapper from './PageWrapper.jsx';
import { useValidate } from '../../utils/hooks/useValidate.js';
import { dogSchema } from '../../utils/dogSchema.js';

const DogSexAndWeight = ({ changeStep, formData }) => {
    const { register, errors, handleSubmit } = useValidate({
        sex: dogSchema.sex,
        weight: dogSchema.weight,
        loveable: dogSchema.loveable,
    });

    const _changeStep = (dir) =>
        handleSubmit((data) => changeStep(dir, data))();
    return (
        <PageWrapper errors={errors}>
            <div className="w-full flex flex-col gap-2">
                <label className="label">
                    <span className="label-text">
                        What's your dog's gender?
                    </span>
                </label>
                <div
                    className="form-control border-secondary border-2 rounded-full px-3
                hover:bg-secondary transition-colors hover:bg-opacity-25"
                >
                    <label className="label cursor-pointer">
                        <span className="label-text">F</span>
                        <input
                            type="radio"
                            {...register('sex')}
                            className="radio checked:bg-secondary"
                            value="F"
                            defaultChecked={formData?.sex === 'F'}
                            autoFocus
                        />
                    </label>
                </div>
                <div
                    className="form-control border-primary border-2 rounded-full px-3
                hover:bg-primary transition-colors hover:bg-opacity-25"
                >
                    <label className="label cursor-pointer">
                        <span className="label-text">M</span>
                        <input
                            type="radio"
                            {...register('sex')}
                            value="M"
                            className="radio checked:bg-primary"
                            defaultChecked={formData?.sex === 'M'}
                        />
                    </label>
                </div>
            </div>
            <div className={`w-full`}>
                <label className="label">
                    <span className="label-text">
                        How much does your dog weigh?(lbs)
                    </span>
                </label>
                <input
                    type="number"
                    placeholder="Type here"
                    defaultValue={formData?.weight}
                    {...register('weight')}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="form-control w-full items-start">
                <label className="label cursor-pointer">
                    <span className="label-text mr-4">Ready to breed?</span>
                    <input
                        type="checkbox"
                        {...register('loveable')}
                        className="toggle toggle-secondary text-6xl"
                    />
                </label>
            </div>
            <div className={`flex flex-wrap justify-center`}>
                <Button onClick={() => _changeStep(-1)}>Previous</Button>
                <Button onClick={() => _changeStep(1)}>Next</Button>
            </div>
        </PageWrapper>
    );
};

export { DogSexAndWeight };
