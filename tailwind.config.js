/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      'nunito': ['Nunito', 'sans-serif'],
      'sans': ['Nunito', 'sans-serif']
    },
  },
};
export const plugins = [
  require('@tailwindcss/forms'),
];