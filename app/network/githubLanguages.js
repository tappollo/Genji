import {languages, featured, allLanguages} from './languages.json';

export const getLanguageName = (language) => {
  return getLanguageDetail(language)?.name
};

export const getLanguageDetail = (language) => {
  return languages[language];
};

export const featuredLanguages = featured;

export const githubAllLanguages = allLanguages;