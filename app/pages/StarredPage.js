import styled from "styled-components";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import githubOauth from "../network/githubOauth";
import { connect } from "react-redux";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const LoginView = ({ onPress }) => (
  <LoginView.Container>
    <LoginView.Intro>To see your stars</LoginView.Intro>
    <LoginView.Button onPress={onPress}>
      <LoginView.Icon />
      <LoginView.Text>Sign in with Github</LoginView.Text>
    </LoginView.Button>
  </LoginView.Container>
);

LoginView.Container = styled.View`
  flex: 1;
  justify-content: center;
`;

LoginView.Button = styled.TouchableOpacity`
  height: 50px;
  margin: 0 20px;
  border-radius: 12px;
  background-color: #2ebc4f;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

LoginView.Icon = styled(Ionicons).attrs({
  name: "logo-github",
  size: 28
})`
  color: white;
  margin-right: 10px;
`;

LoginView.Intro = styled.Text`
  align-self: center;
  color: lightgray;
  font-size: 14px;
  margin-bottom: 20px;
`;

LoginView.Text = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const C = styled.Text``;

const StarredPage = ({ user, updateUser }) => (
  <Container>
    {user ? (
      <C>{user}</C>
    ) : (
      <LoginView
        onPress={async () => {
          const { access_token } = await githubOauth.start();
          updateUser(access_token);
        }}
      />
    )}
  </Container>
);

StarredPage.navigationOptions = {
  title: "Star"
};

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    updateUser: token => dispatch({ type: "UPDATE_USER", payload: token })
  })
)(StarredPage);
