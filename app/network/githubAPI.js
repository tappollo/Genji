export const getReadmeContent = async (repo) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/readme`);
    const {html_url} = await response.json();
    return html_url;
  } catch (e) {
    return `https://github.com/${repo}/blob/master/README.md`
  }
};

export const isRepoStarred = (repo) => {
  return false;
};

export const star = async (repo) => {

};