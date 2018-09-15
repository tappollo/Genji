import cheerio from 'cheerio';
import {colors} from "../utils/StyleSheet";

const linkValueRegex = /\/trending\/?(.*)\?since=.*/;

export const getPopularRepos = async ({timeSpan, language}) => {
  const result = await fetch(`https://github.com/trending/${language.value}?since=${timeSpan}`);
  const text = await result.text();
  const $ = cheerio.load(text);
  const repos = [];

  const featured = [];
  $('.filter-list li a.filter-item').each((index, item) => {
    const $item = $(item);
    const name = $item.text().trim();
    const value = name === language.name ? language.value : $item.attr('href').match(linkValueRegex)[1];
    featured.push({
      name,
      value,
    })
  });

  const allLanguages = [];
  const allLanguageKeys = {};
  $('.col-md-3 .select-menu-list a.js-navigation-item').each((index, item) => {
    const $item = $(item);
    const name = $item.text().trim();
    const value = $item.attr('href').match(linkValueRegex)[1];
    if (allLanguageKeys[value]) {
      return
    }
    allLanguages.push({
      name,
      value,
    });
    allLanguageKeys[value] = true;
  });

  $('li', 'ol.repo-list').each((index, repo) => {
    const $repo = $(repo);
    const $avatars = $repo.find('.avatar');
    const title = $repo.find('h3').text().trim().replace(/ /g, '');

    const starLink = `/${title}/stargazers`;
    const forkLink = `/${title}/network`;
    const repoLink = `https://github.com/${title}`;

    const colorStyle = $repo.find('.repo-language-color').attr('style');
    const color = (colorStyle && colorStyle.replace('background-color:', '').replace(';', '')) || colors.placeholder;

    const item = {
      author: title.split('/')[0],
      repo: title,
      repo_link: repoLink,
      desc: $repo.find('p', '.py-1').text().trim() || null,
      lang: $repo.find('[itemprop=programmingLanguage]').text().trim() || 'Unknown',
      color,
      stars: $repo.find(`[href="${starLink}"]`).text().trim() || 0,
      forks: $repo.find(`[href="${forkLink}"]`).text().trim() || 0,
      avatars: [],
      added_stars: '',
    };

    if ($avatars && $avatars.length) {
      [...$avatars].map($avatar => item.avatars.push($avatar.attribs.src));
    }

    // const { result } = findOne(languages, { name: item.lang });
    // if (result) item.color = result.color;

    repos.push(item);
  });

  return {
    repos,
    featured,
    allLanguages,
  };
};
