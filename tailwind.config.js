module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/screens/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
      colors: {
        'light-red': '#FED2D2',
        red: '#EE0F38',
        'dark-red': '#B32117',
        white: '#FFFFFF',
        black: '#000000',
        orange: '#D78320',
        gray: '#424B5A',
        'dark-gray': '#222222',
        'light-gray': '#E5E5E5',
        'light-gray-transparent': '#E5E5E5dd',
        transparent: 'transparent',
        paragraph: '#848484',
        input: '#EAEDF6',
        'light-green': '#CCF0BF',
        'light-blue': '#CCEFFC',
        'light-blue-green': '#BFF0ED',
        tip: '#C9D6F9',
        blue: '#3C70FF',
        'dark-blue': '#28264A',
        skills: '#ECEFF7',
        'baby-blue': '#CCEFFC',
        'indigo-600': '#3949AB',
        'gray-300': '#e2e8f0',
        'gray-700': '#4a5568',
      },
      extend: {
        height: {
          'mobile-onboarding': 'calc(100% - 150px)',
        },
        maxWidth: {
          'toast-width': '230px',
          'desktop-width': '831px',
          'box-default-home': '246px',
        },
        maxHeight: {
          'mobile-onboarding': 'calc(100% - 150px)',
          '60vh': '60vh',
          '70vh': '70vh',
          '80vh': '80vh',
        },
        minHeight: {
          14: '3.5rem',
          'desktop-container': 'calc(100vh - 0px)',
        },
        minWidth: {
          10: '40px',
          12: '48px',
          14: '56px',
        },
        backgroundImage: {
          'chat-pattern': "url('/images/chat-pattern.png')",
        },
        fontSize: {
          xxs: ['.625rem', '1rem'],
        },
        margin: {
          0.25: '1px',
        },
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
  