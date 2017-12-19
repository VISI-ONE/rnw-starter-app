import getTranslations from './index';
const locales = {
	'en-US': require('./en-US.js'),
	'de-DE': require('./de-DE.js'),
};

describe('Locales', () => {
  it('returns en-US by default', () => {
    const translations = getTranslations();
    expect(translations.login).toEqual(locales['en-US'].login);
  });
  it('returns the currect translations for en-US', () => {
    const translations = getTranslations('en-US');
    expect(translations.login).toEqual(locales['en-US'].login);
  });
  it('returns the currect translations for de-DE', () => {
    const translations = getTranslations('de-DE');
    expect(translations.login).toEqual(locales['de-DE'].login);
  });
});
