import React, { useLayoutEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { useValidate } from '../../utils/hooks/useValidate.js';

const EditableText = ({
    displayValue,
    defaultValue,
    onEdit,
    className,
    validation,
    type = 'text',
    editable = false,
}) => {
    const [editMode, setEditMode] = React.useState(false);
    const [displayTooltip, setDisplayTooltip] = React.useState(false);

    const { register, handleSubmit, errors, resetField, getValues } =
        useValidate({
            value: validation,
        });

    const onValidEdit = (data) => {
        onEdit && onEdit(data);
        setEditMode(false);
    };

    const inputProps = {
        autoFocus: true,
        onKeyDown: (e) => {
            if (e.key === 'Enter') {
                handleSubmit(onValidEdit)();
            }
        },
        defaultValue,
        ...register('value'),
    };

    const animProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
    };

    const cancelEdit = () => {
        resetField('value');
        setEditMode(false);
    };
    const valRef = React.useRef();
    const [valWidth, setValWidth] = React.useState(0);

    useLayoutEffect(() => {
        setValWidth(valRef?.current?.offsetWidth);
    }, [valRef]);

    return (
        <div
            onBlur={(e) => {
                if (e.currentTarget.contains(e.relatedTarget)) return;
                cancelEdit();
            }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {!editMode ? (
                    <motion.div
                        key={'view'}
                        ref={valRef}
                        className={`${className}`}
                        onClick={() => editable && setEditMode(true)}
                        {...animProps}
                    >
                        {displayValue ?? getValues('value') ?? defaultValue}
                    </motion.div>
                ) : (
                    <motion.div
                        key={'edit'}
                        className={`flex items-center gap-2`}
                        {...animProps}
                    >
                        {type === 'textarea' ? (
                            <textarea
                                className={`bg-inherit w-full textarea textarea-bordered textarea-primary`}
                                defaultValue={defaultValue}
                                {...inputProps}
                            />
                        ) : (
                            <input
                                type={type}
                                className={`bg-inherit input input-bordered input-primary`}
                                // style={{ fontSize: 'max(50%, 1rem)' }}
                                style={{ width: `max(${valWidth}px, 75%)` }}
                                defaultValue={defaultValue}
                                {...inputProps}
                            />
                        )}
                        <div className={`flex gap-1 cursor-pointer`}>
                            <button onClick={handleSubmit(onValidEdit)}>
                                <AiOutlineCheckCircle
                                    className={`text-green-500 text-3xl`}
                                    // style={{ fontSize: `max(100%, 2rem)` }}
                                />
                            </button>
                            <button onClick={cancelEdit}>
                                <AiOutlineCloseCircle
                                    className={`text-red-500 text-3xl`}
                                    // style={{ fontSize: `max(100%, 2rem)` }}
                                />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EditableText;
