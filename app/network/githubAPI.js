import EventEmitter from 'EventEmitter';

const eventEmitter = new EventEmitter();

export const getReadmeContent = async (repo) => {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/README.md`, {
    headers: {
      'Accept': 'application/vnd.github.VERSION.html'
    }
  });
  return response.text();
};

export const isRepoStarred = (repo) => {
  return false;
};

export const star = async (repo) => {

};