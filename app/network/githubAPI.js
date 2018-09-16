export const getReadmeContent = async (repo) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/readme`);
    const {html_url} = await response.json();
    return html_url;
  } catch (e) {
    return `https://github.com/${repo}/blob/master/README.md`
  }
};

export const star = async ({repo, auth}) => {
  const response = await fetch(`https://api.github.com/user/starred/${repo}`, {
    method: 'PUT',
    headers: {
      'Authorization': `bearer ${auth}`
    }
  });
  if (!response.ok) {
    throw response.statusText;
  }
};

export const unstar = async ({repo, auth}) => {
  const response = await fetch(`https://api.github.com/user/starred/${repo}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `bearer ${auth}`
    }
  });
  if (!response.ok) {
    throw response.statusText;
  }
};

