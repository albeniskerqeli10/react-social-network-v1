
module.exports = {
  // Uncomment the line below to enable the experimental Just-in-Time ("JIT") mode.
  // https://tailwindcss.com/docs/just-in-time-mode
  // mode: "jit",
  theme: {
    extend: {
      colors: {
        'primary':"#2563eb",
        'light-primary':"#F0F5FA"
      },
      boxShadow: {
        'custom':"0 3px 15px rgb(0 0 0 / 7%)",
        'box':'0 3px 20px rgb(0 0 0 / 4%)',
      }
    },
    fontFamily: {
      'inter':['Inter' , 'sans-serif'],
      'manrope':['Manrope' , 'sans-serif']
    },
 
  },
  variants: {},
  plugins: [],
  content: [
       "./src/**/*.html",
       "./src/**/*.js",
       "./src/**/*.jsx",
       "./src/**/*.ts",
       "./src/**/*.tsx",
       "./public/index.html",
  ],
     // Options passed to PurgeCSS
    // },
    // Filenames to scan for classes
    // content: {
    //   "./src/**/*.html",
    //   "./src/**/*.js",
    //   "./src/**/*.jsx",
    //   "./src/**/*.ts",
    //   "./src/**/*.tsx",
    //   "./public/index.html",
    // // Options passed to PurgeCSS
    // },
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  
};
