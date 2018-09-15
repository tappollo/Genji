import AutoHeightWebView from "react-native-autoheight-webview";
import React, { Fragment } from "react";
import { Linking } from "react-native";
import SafariView from "react-native-safari-view";
import { Onmount } from "../functionComponents/Stateful";

const Readme = ({ children, onReady, ...props }) => (
  <Fragment>
    <AutoHeightWebView
      enableAnimation={false}
      onLoadEnd={() => {
        onReady()
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
      source={{ uri: children }}
      {...props}
    />
  </Fragment>
);

export default Readme;
