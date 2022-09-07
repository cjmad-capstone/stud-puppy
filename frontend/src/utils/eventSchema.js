import * as yup from 'yup';

export const eventSchema = {
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    date: yup
        .date()
        .typeError('Date format invalid.')
        .min(new Date(), 'Date must be in the future.')
        .required('Date is required'),
    zipCode: yup
        .number()
        .typeError('Zip code must be a number.')
        .test(
            'len',
            'zip must be between 5 and 10 digits',
            (val) => String(val).length >= 5 && String(val).length <= 10
        )
        .required('Location is required'),
};
