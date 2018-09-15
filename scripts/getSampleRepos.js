const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const getPopularRepos = async ({timeSpan = "daily", language = ""} = {}) => {
  const result = await fetch(`https://github.com/trending/${language}?since=${timeSpan}`);
  const text = await result.text();
  const $ = cheerio.load(text);
  const repos = [];

  $('li', 'ol.repo-list').each((index, repo) => {
    const $repo = $(repo);
    const $avatars = $repo.find('.avatar');
    const title = $repo.find('h3').text().trim().replace(/ /g, '');

    const starLink = `/${title}/stargazers`;
    const forkLink = `/${title}/network`;
    const repoLink = `https://github.com/${title}`;

    const colorStyle = $repo.find('.repo-language-color').attr('style');
    const color = (colorStyle && colorStyle.replace('background-color:', '').replace(';', ''));

    const avatars = [];
    $avatars.each((index, $avatar) => avatars.push($avatar.attribs.src));

    const item = {
      author: title.split('/')[0],
      repo: title,
      repo_link: repoLink,
      desc: $repo.find('p', '.py-1').text().trim() || null,
      lang: $repo.find('[itemprop=programmingLanguage]').text().trim() || 'Unknown',
      color,
      stars: $repo.find(`[href="${starLink}"]`).text().trim() || 0,
      forks: $repo.find(`[href="${forkLink}"]`).text().trim() || 0,
      activity: $repo.find('.float-sm-right').text().trim(),
      avatars,
    };

    repos.push(item);
  });

  return repos;
};

(async () => {
  const result = await getPopularRepos();
  console.log(result);
  fs.writeFileSync('./sampleRepos.json', JSON.stringify(result, null, 2))
})();
