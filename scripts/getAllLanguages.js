const cheerio = require('cheerio');
const fetch = require('node-fetch');
const colors = require('./colors.json');
const fs = require('fs');
const _ = require('lodash');

const getPopularRepos = async () => {
  const linkValueRegex = /\/trending\/?(.*)\?since=.*/;

  console.time("Request");
  const result = await fetch(`https://github.com/trending`);
  console.timeEnd("Request");
  const text = await result.text();
  const $ = cheerio.load(text);

  const featured = [];
  $('.filter-list li a.filter-item').each((index, item) => {
    const $item = $(item);
    const value = $item.attr('href').match(linkValueRegex)[1];
    if (["", "unknown"].includes(value)) {
      return;
    }
    featured.push(value);
  });

  const allLanguages = [];
  const languages = {};
  $('.col-md-3 .select-menu-list a.js-navigation-item').each((index, item) => {
    const $item = $(item);
    const name = $item.text().trim();
    const value = $item.attr('href').match(linkValueRegex)[1];
    allLanguages.push(value);
    languages[value] = {
      name,
      color: colors[name] && colors[name].color || null,
    };
  });

  return {
    featured,
    allLanguages: _.uniq(allLanguages),
    languages,
  };
};

(async () => {
  const result = await getPopularRepos();
  fs.writeFileSync('../app/network/languages.json', JSON.stringify(result, null, 2))
})();
