import { DogNameAndBreed } from '../components/CreateDogForm/DogNameAndBreed.jsx';
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { pt } from '../utils/anim/global.js';
import { motion } from 'framer-motion';
import { DogSexAndWeight } from '../components/CreateDogForm/DogSexAndWeight.jsx';
import { DogDescription } from '../components/CreateDogForm/DogDescription';
import { DogDOBAndZip } from '../components/CreateDogForm/DogDOBAndZip.jsx';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../utils/auth/authHeader.js';
import { DogImages } from '../components/CreateDogForm/DogImages';
import { UserContext } from '../context/UserContext.jsx';
import Loading from 'react-loading';
import { withAuth } from '../utils/auth/withAuth.jsx';

const CreateDog = () => {
    const navigate = useRef(useNavigate());

    const { user } = useContext(UserContext);

    const [step, setStep] = React.useState(0);
    const [formData, setFormData] = React.useState({
        name: '',
        sex: '',
        weight: 0,
        dob: '',
        description: '',
        loveable: false,
        breeds: [],
        images: [],
    });

    const changeStep = (direction, data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + direction);
    };

    const steps = useMemo(() => {
        const props = { changeStep, formData, setFormData };

        return [
            {
                title: 'Name & Breed',
                component: <DogNameAndBreed key="dog-name" {...props} />,
            },
            {
                title: 'Sex & Weight',
                component: <DogSexAndWeight key="dog-sex-weight" {...props} />,
            },
            {
                title: 'Dob & Zip',
                component: <DogDOBAndZip key="dog-dob" {...props} />,
            },
            {
                title: 'Description',
                component: <DogDescription key="dog-desc" {...props} />,
            },
            {
                title: 'Images',
                component: <DogImages key="dog-images" {...props} />,
            },
        ];
    }, [formData]);

    const submitForm = useCallback(async () => {
        const newFormData = { ...formData };
        fetch('/api/dogs', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...authHeader(),
            },
            body: JSON.stringify(newFormData),
        })
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    // Go to the new dog's profile if data submitted successfully
                    navigate.current('/dog/' + data.id);
                }, 2000);
            });
    }, [formData]);

    useEffect(() => {
        if (step === steps.length)
            submitForm().then((data) => console.log(data));
    }, [step, steps.length, submitForm]);

    const mainRef = useRef();

    // Scrolls to center form
    useEffect(() => {
        mainRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mainRef]);

    return (
        <motion.main
            {...pt}
            ref={mainRef}
            className={'relative flex flex-col justify-center items-center'}
        >
            <ul className="steps py-6 font-brand">
                {steps.map((_step, idx) => (
                    <li
                        key={idx}
                        className={`step ${
                            idx < step
                                ? 'step-success after:content-["✓"] after:text-green-800'
                                : 'after:content-[counter(step)]'
                        } ${
                            idx === step
                                ? 'after:border-4 after:border-success'
                                : ''
                        }`}
                    >
                        {_step.title}
                    </li>
                ))}
            </ul>
            <AnimatePresence mode="wait">
                {steps.map((el, idx) => step === idx && el.component)}
                {step === steps.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex flex-col justify-center items-center`}
                    >
                        <h1 className="text-4xl font-brand font-bold">
                            Creating pupper...
                        </h1>
                        <Loading type="bubbles" color="black" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
};

export default withAuth(CreateDog, '/login?ref=create-dog');
