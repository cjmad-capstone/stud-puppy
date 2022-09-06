import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SelectedBadge = ({ children, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layout
            className={`badge badge-secondary transition-none  text-lg font-bold p-5 gap-3`}
        >
            {children}
            <span
                className={`text-red-800 cursor-pointer  rounded-full flex items-center justify-center`}
                onClick={onDelete}
            >
                x
            </span>
        </motion.div>
    );
};

const MultiSelect = ({ options, label, setValues }) => {
    const [openDropdown, setOpenDropdown] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [filteredOptions, setFilteredOptions] = React.useState(options);

    useEffect(() => {
        setFilteredOptions(
            options.filter((option) => !selected.includes(option))
        );
    }, [options, selected]);

    useEffect(() => {
        setValues(selected);
    }, [selected, setValues]);

    return (
        <div className={`relative`}>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type="text"
                placeholder="Search Here"
                onChange={(e) =>
                    setFilteredOptions(
                        options.filter(
                            (option) =>
                                option
                                    .toLowerCase()
                                    .includes(e.target.value.toLowerCase()) &&
                                !selected.includes(option)
                        )
                    )
                }
                onFocus={() => setOpenDropdown(true)}
                onBlur={() => setOpenDropdown(false)}
                className="input input-bordered input-secondary w-full max-w-xs"
            />
            <AnimatePresence mode="popLayout">
                {openDropdown && (
                    <motion.ul
                        className={`absolute bg-base-100 p-4 flex flex-wrap gap-3 rounded-xl overflow-scroll max-h-64 max-w-32 shadow-xl`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {filteredOptions.map((option, i) => (
                            <li
                                className={`cursor-pointer text-sm font-bold bg-secondary bg-opacity-50 p-3 rounded-full `}
                                key={i}
                                onClick={() => {
                                    setSelected((prev) => [...prev, option]);
                                }}
                            >
                                {option}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

            <div className={`flex flex-wrap gap-3 py-4`}>
                <AnimatePresence mode="sync">
                    {selected.map((option, i) => (
                        <SelectedBadge
                            key={option}
                            onDelete={() =>
                                setSelected((prev) =>
                                    prev.filter((opt) => opt !== option)
                                )
                            }
                        >
                            {option}
                        </SelectedBadge>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MultiSelect;
