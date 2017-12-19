const locales = {
  'en-US': require('./en-US.js'),
  'de-DE': require('./de-DE.js'),
};

export const localeOptions = [
  {
    label: 'en',
    value: 'en-US',
  },
  {
    label: 'de',
    value: 'de-DE',
  },
];

const getTranslations = (locale = 'en-US') => locales[locale];

export default getTranslations;
