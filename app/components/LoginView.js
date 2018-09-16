import styled from "styled-components";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

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

export default LoginView;
