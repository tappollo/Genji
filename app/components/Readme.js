import AutoHeightWebView from "react-native-autoheight-webview";
import React, { Fragment } from "react";
import { Linking } from "react-native";
import SafariView from "react-native-safari-view";
import { Onmount } from "../functionComponents/Stateful";

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

const Readme = ({ repo, onReady, style }) => (
  <AutoHeightWebView
    style={style}
    enableAnimation={false}
    onLoadEnd={() => {
      onReady();
    }}
    onMessage={async event => {
      const url = event?.nativeEvent?.data;
      if (!url) {
        return;
      }
      if (await SafariView.isAvailable()) {
        SafariView.show({ url });
      } else {
        Linking.openURL(url);
      }
    }}
    source={{ url: `https://github.com/${repo}/blob/master/README.md` }}
    customScript={`
    var elements = document.getElementsByTagName('a');
    for(var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.postMessage(this.href);
            return false;
        }
    }
    window.onclick = function(e) {
      if (e.target.tagName === "A") {
        window.postMessage(e.target.href);
      }
      return false;
    };
    `}
    customStyle={`
        header.Header, .reponav-wrapper.lh-default, .breadcrumb.blob-breadcrumb, footer {
          display: none !important;
        }
        body {
          background-color: transparent !important
        }
      `}
  />
);

export default Readme;
