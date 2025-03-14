// tailwind config
module.exports = {

    theme: {
        extend: {
            container: {
                center:true,
                padding: '2rem',
                screens: {
                    'sm': '640px',
                    'md': '768px',
                    'lg': '1024px',
                    'xl': '1170px',
                    '2xl': '1536px',
                }
            }
        },
    },
    plugins: [],    
}
