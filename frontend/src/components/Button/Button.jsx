const Button = ({ onClick, className, children, ...rest }) => {
    return (
        <button
            onClick={onClick}
            className={`flex text-slate-50 items-center shadow-xl content-center btn bg-gradient-to-br from-pink-400 to-red-500 rounded-full text-3xl px-12 py-8 m-2 border-none normal-case ${className}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;