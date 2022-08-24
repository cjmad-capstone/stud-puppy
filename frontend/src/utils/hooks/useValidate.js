import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useValidate = (schema) => {
    const schemaObject = yup.object({ ...schema }).required();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaObject),
    });

    return { register, handleSubmit, errors };
};

export { useValidate };
