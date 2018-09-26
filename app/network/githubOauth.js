import {Linking} from 'react-native';
import SafariView from 'react-native-safari-view';

// Please don't abuse this
// Kept it here for convenience
// You can get it from the ipa file anyway
// So plz, pretty please
const clientID = 'daa3ed310bf7c0d7ba1e';
const clientSecret = '606be629beec5490d03d466bf1008555c97f3d96';

class GithubOauth {
  tradeIn = async (code) => {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
          client_id: clientID,
          client_secret: clientSecret,
          code,
        }
      )
    });
    return await response.json()
  };
  onURL = async ({url}) => {
    await SafariView.dismiss();
    const code = url.match(/code=(.*)($|&)/)?.[1];
    if (code) {
      this.resolve && this.resolve(await this.tradeIn(code));
    }
    Linking.removeEventListener("url", this.onURL);
  };
  onSafariViewDismiss = () => {
    Linking.removeEventListener("url", this.onURL);
  };
  start = async () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=public_repo`;
    if (await SafariView.isAvailable()) {
      SafariView.show({
        url: url
      });
      SafariView.addEventListener('onDismiss', this.onSafariViewDismiss);
    } else {
      Linking.openURL(url);
    }
    Linking.addEventListener("url", this.onURL);
    return await new Promise((resolve) => {this.resolve = resolve});
  }

}

export default new GithubOauth();
