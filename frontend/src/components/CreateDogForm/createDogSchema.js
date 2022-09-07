import * as yup from 'yup';

export const createDogSchema = {
    name: yup.string().required('Name is required'),
    dob: yup.date().max(new Date()).required('DOB is required'),
    zipCode: yup.number().required('Zip code is required'),
    age: yup.number().required('Age is required'),
    description: yup
        .string()
        .max(200, 'Description cannot be more than 200 chars')
        .required('Description is required'),
    sex: yup.string().required('Sex is required'),
    weight: yup
        .number()
        .min(1, 'Weight has to be above 0')
        .required('Weight is required'),
    loveable: yup.boolean(),
};
