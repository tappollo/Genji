import fs from 'react-native-fs';

const template = html => `
<!DOCTYPE html>
<html>
<head>
	<title>Readme.md</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<script type="text/javascript">
	window.onclick = function(e) { 
		if (e.target.tagName === "A") {
		  window.postMessage(e.target.href);
		}
		return false; 
	};
</script>
<style>
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
<article class="markdown-body">
${html}
</article>
</body>
</html>
`;

export const getReadmeContent = async (repo) => {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/README.md`, {
    headers: {
      'Accept': 'application/vnd.github.VERSION.html'
    }
  });
  const html = template(await response.text());
  const path = fs.DocumentDirectoryPath + '/githubWebview.html';
  await fs.writeFile(path, html, 'utf8');
  return path;
};

export const isRepoStarred = (repo) => {
  return false;
};

export const star = async (repo) => {

};