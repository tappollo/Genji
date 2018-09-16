import cheerio from 'cheerio';
import EventEmitter from 'eventemitter3';
import fs from 'react-native-fs';

export const trendingEvent = new EventEmitter();

const getOnDiskVersion = async (key) => {
  try {
    const string = await fs.readFile(`${fs.DocumentDirectoryPath}/${key}.json`, 'utf8');
    return string && JSON.parse(string);
  } catch (e) {
    return null;
  }
};

const saveToDisk = async (key, data) => {
  try {
    await fs.writeFile(`${fs.DocumentDirectoryPath}/${key}.json`, JSON.stringify(data), 'utf8')
  } catch (e) {
    alert(e);
  }
};

const fetchingInProgress = {};

export const loadTrending = async ({timeSpan = "daily", language = ""} = {}) => {
  const key = `${timeSpan}_${language}`;
  const cached = await getOnDiskVersion(key);
  if (cached) {
    trendingEvent.emit(key, {
      type: 'cached',
      data: cached,
    })
  } else {
    trendingEvent.emit(key, {
      type: 'loading',
    });
  }
  if (fetchingInProgress[key]) {
    return;
  }
  fetchingInProgress[key] = true;
  const newFromNetwork = await fetchLoadRepos({timeSpan, language});
  trendingEvent.emit(key, {
    type: 'newData',
    data: newFromNetwork,
  });
  fetchingInProgress[key] = false;
  await saveToDisk(key, newFromNetwork);
};

const fetchLoadRepos = async ({timeSpan, language}) => {
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
