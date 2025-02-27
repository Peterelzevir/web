module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float-delay 8s ease-in-out infinite',
        'float-delay-long': 'float-delay-long 10s ease-in-out infinite',
        'type-clean': 'type-clean 3s steps(40, end) 1s 1 normal both',
        'cursor': 'cursor 0.75s step-end infinite',
        'loading-progress': 'loading-progress 2.5s ease-in-out forwards',
        'spin-reverse': 'spin-reverse 2s linear infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'spin-slower': 'spin-slower 12s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(10px, -10px) rotate(5deg)' },
        },
        'float-delay': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-10px, 10px) rotate(-5deg)' },
        },
        'float-delay-long': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(15px, 15px) rotate(10deg)' },
        },
        'type-clean': {
          '0%': { width: '0' },
          '99.9%': { borderRight: '0.15em solid' },
          '100%': { width: '100%' },
        },
        'cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'loading-progress': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'spin-reverse': {
          'to': { transform: 'rotate(-360deg)' },
        },
        'spin-slow': {
          'to': { transform: 'rotate(360deg)' },
        },
        'spin-slower': {
          'to': { transform: 'rotate(-360deg)' },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
};