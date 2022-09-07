import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({
    children,
    open,
    setOpen,
    onPositive,
    onNegative,
    customButtons = false,
    positiveText = 'Yes',
    negativeText = 'No',
}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.25,
            }}
            className={
                'fixed flex items-center justify-center z-[9999] inset-0 bg-black bg-opacity-50'
            }
        >
            <div className={`w-1/2 bg-base-100 p-4 rounded-xl`}>
                {children}
                {!customButtons && (
                    <div className={`flex justify-center gap-3 pt-4`}>
                        <button
                            className={'btn btn-success'}
                            onClick={(e) => {
                                onPositive && onPositive(e);
                            }}
                        >
                            {positiveText}
                        </button>
                        <button
                            className={'btn btn-error'}
                            onClick={(e) => {
                                setOpen(false);
                                onNegative && onNegative(e);
                            }}
                        >
                            {negativeText}
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Modal;
