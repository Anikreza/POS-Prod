module.exports = {
    darkMode: 'class',
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.tsx",
        "./resources/**/*.ts",
        "./resources/**/*.vue",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            'body':'#1F1D2B',
            'body2':'#2D303E',
            'theme':'#EA7C69',
            'appWhite':'#e1e1e1',
            'offWhite':'#a2a2a2',
            'secondary':'#9288E0',
            'paste':'#50D1AA',
            'border':'#2f2f2f',
            'darkTheme':'#5b3836',
            'red':'#ee0c0c',
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
}
