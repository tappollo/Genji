import RepoCard from "../components/RepoCard";
import React from "react";
import {SectionList} from "react-native";
import dummy from "../../scripts/sampleRepos";
import styled from "styled-components";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const sections = [{ data: dummy, title: "Today", subtitle: "MONDAY, JUNE 5" }];

const List = styled(SectionList).attrs({
  stickySectionHeadersEnabled: false,
})`
  flex: 1;
`;

const StatusbarOverlay = styled.View`
  height: ${getStatusBarHeight(true)};
  background-color: white;
`;

const Header = ({title, subtitle}) => (
  <Header.Container>
    <Header.Title>{title}</Header.Title>
    <Header.Subtitle>{subtitle}</Header.Subtitle>
  </Header.Container>
);

Header.Container = styled.View`
  padding: 26px 20px 5px;
`;

Header.Title = styled.Text`
  font-weight: bold;
  font-size: 34px;
  line-height: 41px;
  color: black;
`;

Header.Subtitle = styled.Text`
  font-weight: 600;
  color: #8E8E93;
  font-size: 12px;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const TodayPage = ({navigation}) => (
  <Container>
    <StatusbarOverlay />
    <List
      sections={sections}
      renderItem={({ item }) => <RepoCard {...item} onPress={() => {
        navigation.navigate('RepoDetailPage');
      }}/>}
      renderSectionHeader={({ section }) => (
        <Header title={section.title} subtitle={section.subtitle} />
      )}
      keyExtractor={({ repo }) => repo}
    />
  </Container>
);

TodayPage.navigationOptions = {
  title: "Today"
};

export default TodayPage;
