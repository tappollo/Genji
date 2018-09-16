

export const getReadmeContent = async (repo) => {
  const response = await fetch(`https://api.github.com/repos/${repo}/readme`);
  const {html_url} = await response.json();
  return html_url;
};

export const isRepoStarred = (repo) => {
  return false;
};

export const star = async (repo) => {

};