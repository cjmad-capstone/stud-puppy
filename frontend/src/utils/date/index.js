import { isDate, parse } from 'date-fns';

export const parseDateString = (value, originalValue) => {
    return isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'yyyy-MM-dd', new Date());
};
