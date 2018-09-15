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
		  window.location.href = "genji://safari?url=" + decodeURIComponent(e.target.href);
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
${html}
</body>
</html>
`;

const Readme = ({ children, onReady, ...props }) => (
  <Fragment>
    <Onmount callOnUnmount>
      {({ mount, object }) => {
        if (mount) {
          object.onURL = async ({ url }) => {
            const decoded = decodeURIComponent(
              url.replace("genji://safari?url=", "")
            );
            if (!decoded) {
              return;
            }
            if (await SafariView.isAvailable()) {
              SafariView.show({url: decoded})
            } else {
              Linking.openURL(decoded);
            }
          };
          Linking.addEventListener("url", object.onURL);
        } else {
          Linking.removeEventListener("url", object.onURL);
        }
      }}
    </Onmount>
    <AutoHeightWebView
      enableAnimation={false}
      onLoadEnd={onReady}
      source={{ html: template(children) }}
      {...props}
    />
  </Fragment>
);

export default Readme;
