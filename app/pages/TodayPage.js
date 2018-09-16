import React from "react";
import styled from "styled-components";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import TrendingList from "../components/TrendingList";


const StatusbarOverlay = styled.View`
  height: ${getStatusBarHeight(true)};
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const TodayPage = ({ navigation }) => (
  <Container>
    <StatusbarOverlay />
    <TrendingList onSelect={item => {
      navigation.navigate("RepoDetailPage", { repo: item });
    }}/>
  </Container>
);

TodayPage.navigationOptions = {
  title: "Today"
};

export default TodayPage;
