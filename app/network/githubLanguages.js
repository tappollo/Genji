import {languages, featured, allLanguages} from './languages.json';

export const getLanguageName = (language) => {
  return languages[language]?.name;
};

export const featuredLanguages = featured;

export const githubAllLanguages = allLanguages;