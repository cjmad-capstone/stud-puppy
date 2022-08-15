/** @type {import('tailwindcss').Config} */

module.exports = {
    important: true,
    content: [
        'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'brand': 'Poppins'
            }
        },
    },
    plugins: [require('daisyui')],
};
