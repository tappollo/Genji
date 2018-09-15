/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking} from 'react-native';
import {auth} from "react-native-firebase";
import SafariView from 'react-native-safari-view';
import githubOauth from "./app/network/githubOauth";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  onURL = async (url) => {
    await SafariView.dismiss();
    alert(JSON.stringify(url));
  };
  async componentDidMount() {
    try {
      const {access_token} = await githubOauth.start();
      const credential = auth.GithubAuthProvider.credential(access_token);
      await auth().signInAndRetrieveDataWithCredential(credential);
    } catch (e) {
      alert(e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
