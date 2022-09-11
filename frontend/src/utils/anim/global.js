export const fadeIn = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

export const pt = {
    ...fadeIn,
    transition: {
        duration: 0.25,
    },
};
