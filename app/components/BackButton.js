import React from "react";
import styled from "styled-components";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Ionicons from "react-native-vector-icons/Ionicons";

export const BackButton = ({onPress, style}) => (
  <BackButton.Container onPress={onPress} style={style}>
    <BackButton.Icon />
  </BackButton.Container>
);

BackButton.Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.95
})`
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  top: ${getStatusBarHeight(true) + 5};
  left: 10px;
  background-color: white;
`;

BackButton.Icon = styled(Ionicons).attrs({
  name: "ios-arrow-back",
  size: 30,
})`
  color: gray;
  padding-right: 5px;
  padding-top: 3px;
`;

export const BackButtonWithShadow = styled(BackButton)`
  box-shadow: 0 2px 3px rgba(0,0,0,0.1);
  overflow: visible;
`;
