import React from "react";
import styled from "styled-components";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import TrendingList from "../components/TrendingList";
import {BackButtonWithShadow} from "../components/BackButton";


const StatusbarOverlay = styled.View`
  height: ${getStatusBarHeight(true)};
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const LanguageDetailPage = ({ navigation }) => (
  <Container>
    <StatusbarOverlay />
    <TrendingList language={navigation.getParam('lang')} onSelect={item => {
      navigation.navigate("RepoDetailPage", { repo: item });
    }}/>
    <BackButtonWithShadow onPress={() => navigation.pop()}/>
  </Container>
);

LanguageDetailPage.navigationOptions = {
  title: "Today"
};

export default LanguageDetailPage;
