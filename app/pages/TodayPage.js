import RepoCard from "../components/RepoCard";
import React, {Fragment} from "react";
import { FlatList } from "react-native";
import dummy from "../../scripts/sampleRepos";
import styled from "styled-components";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const List = styled(FlatList)`
  flex: 1;
`;

const StatusbarOverlay = styled.View`
  height: ${getStatusBarHeight(true)};
  background-color: white;
`;

const TodayPage = () => (
  <Fragment>
    <StatusbarOverlay />
    <List
      renderItem={({ item }) => <RepoCard {...item}/>}
      data={dummy}
      keyExtractor={({ repo }) => repo}
    />
  </Fragment>
);

TodayPage.navigationOptions = {
  title: "Today"
};

export default TodayPage;
