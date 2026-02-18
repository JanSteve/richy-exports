/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#080D08',
                'bg-mid': '#0C150C',
                'bg-card': '#101A10',
                'bg-lift': '#152015',
                'gold': '#C8A96E',
                'gold-light': '#E8C98E',
                'brand-green': '#2D5A27',
                'lime': '#7AAF6A',
                'cream': '#F0EDE6',
                'muted': '#7A7A6A',
                'dim': '#4A4A3A',
            },
            fontFamily: {
                display: ['"Cormorant Garamond"', 'serif'],
                body: ['"DM Sans"', 'sans-serif'],
                quote: ['"Playfair Display"', 'serif'],
            },
            animation: {
                marquee: 'marquee 30s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
