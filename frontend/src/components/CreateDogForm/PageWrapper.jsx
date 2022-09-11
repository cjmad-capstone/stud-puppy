import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
const PageWrapper = ({ children, errors }) => {
    const errorVariants = {
        in: {
            opacity: 1,
            scaleY: 1,
            height: 'auto',
        },
        out: {
            opacity: 0,
            scaleY: 0,
            height: 0,
        },
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.25 } }}
            className={`p-4 border-1 gap-4 bg-base-100  relative  rounded-xl w-3/4 md:w-1/2 flex flex-col items-center justify-center`}
        >
            <AnimatePresence>
                {!_.isEmpty(errors) && (
                    <motion.div
                        className={'w-full'}
                        variants={errorVariants}
                        initial="out"
                        animate="in"
                        exit="out"
                    >
                        <div className="alert alert-error shadow-lg flex flex-col items-start">
                            {Object.values(errors).map((error) => (
                                <div key={error.message}>{error.message}</div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                    opacity: 1,
                    scaleX: 1,
                    transition: { delay: 0.25, type: 'linear' },
                }}
                exit={{ opacity: 0 }}
                transition={{ type: 'linear' }}
                className={`absolute  shadow-xl -inset-3 bg-red-100 -z-20 rounded-xl bg-gradient-to-br from-primary/50 to-secondary/50`}
            />
        </motion.section>
    );
};

export default PageWrapper;
