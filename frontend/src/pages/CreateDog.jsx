import { withAuth } from '../utils/auth/withAuth.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button/Button.jsx';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const FormPage = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center gap-4 w-1/3 justify-center mx-auto`}
        >
            {children}
        </motion.div>
    );
};

const BasicInfo = ({ nextStep }) => {
    return (
        <FormPage>
            <h1 className={`text-4xl font-brand font-bold`}>
                Tell us a little about your furry friend...
            </h1>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">What's their name?</span>
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                />
            </div>
            <Button onClick={() => nextStep()}>Next</Button>
        </FormPage>
    );
};

const MoreInfo = ({ previousStep, nextStep }) => {
    return (
        <FormPage>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">How old are they?</span>
                </label>
                <input type="number" className="input input-bordered w-full" />
            </div>
            <div className={`flex`}>
                <Button onClick={() => previousStep()}>Previous</Button>
                <Button onClick={() => nextStep()} autofocus>
                    Next
                </Button>
            </div>
        </FormPage>
    );
};

const CreateDog = () => {
    const [step, setStep] = useState(0);
    const nextStep = () => {
        setStep((step) => step + 1);
    };
    const previousStep = () => {
        setStep((step) => step - 1);
    };

    const main = useRef();
    useEffect(() => {
        setTimeout(() => {
            main.current?.scrollIntoView();
        }, 1000);
    }, []);

    return (
        <motion.main className={`p-4 flex`} ref={main}>
            <AnimatePresence mode="wait">
                {[
                    <BasicInfo key="basicInfo" nextStep={nextStep} />,
                    <MoreInfo
                        key="moreInfo"
                        previousStep={previousStep}
                        nextStep={nextStep}
                    />,
                ].filter((el, idx) => idx === step)}
            </AnimatePresence>
        </motion.main>
    );
};

export default withAuth(CreateDog, '/login?ref=create-dog');
