const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   purge: false, 
//   content: [
    
//     './public/*.html',
//     './app/helpers/**/*.rb',
//     './app/javascript/**/*.js',
//     './app/views/**/*.{erb,haml,html,slim}',
//      './app/assets/stylesheets/**/*.css' 
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter var', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   plugins: [
//     // require('@tailwindcss/forms'),
//     // require('@tailwindcss/typography'),
//     // require('@tailwindcss/container-queries'),
//   ]
// }
module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/assets/stylesheets/**/*.css" // ✅ Correct Path
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
