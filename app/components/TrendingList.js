import styled from "styled-components";
import { SectionList, ActivityIndicator } from "react-native";
import Stateful, { Onmount } from "../functionComponents/Stateful";
import React, { Fragment } from "react";
import RepoCard from "./RepoCard";
import dummy from "../../scripts/sampleRepos";
import {loadTrending, trendingEvent} from "../network/githubHTML";
import dayjs from "dayjs";

const sections = [{ data: dummy, title: "Today", subtitle: "MONDAY, JUNE 5" }];

const Header = ({ title, subtitle }) => (
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
  color: #8e8e93;
  font-size: 12px;
`;

const List = styled(SectionList).attrs({
  stickySectionHeadersEnabled: false
})`
  flex: 1;
`;

const Loading = () => (
  <Loading.Container>
    <ActivityIndicator />
  </Loading.Container>
);

Loading.Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const sectionsFrom = ({daily, weekly, monthly}) => {
  const sections = [];
  if (daily) {
    sections.push({
      data: daily,
      title: "Today",
      subtitle: dayjs().format('dddd MMMM D').toUpperCase()
    })
  }
  if (weekly) {
    sections.push({
      data: weekly,
      title: "This Week",
      subtitle: 'FROM ' + dayjs().subtract(1, 'week').format('dddd MMMM D').toUpperCase()
    })
  }
  if (monthly) {
    sections.push({
      data: monthly,
      title: "This Month",
      subtitle: 'FROM ' + dayjs().subtract(1, 'month').format('dddd MMMM D').toUpperCase()
    })
  }
  return sections;
};

const TrendingList = ({ language = "", onSelect }) => (
  <Stateful>
    {({ state, setState, object }) => (
      <Fragment>
        <Onmount>
          {async ({ mount }) => {
            if (mount) {
              object.onDailyUpdate = ({ type, data }) => {
                setState({
                  loading: type === "loading",
                  daily: data
                });
              };
              object.onWeeklyUpdate = ({ type, data }) => { setState({ weekly: data }); };
              object.onMonthlyUpdate = ({ type, data }) => { setState({ monthly: data }); };
              trendingEvent.on(`daily_${language}`, object.onDailyUpdate);
              trendingEvent.on(`weekly_${language}`, object.onWeeklyUpdate);
              trendingEvent.on(`weekly_${language}`, object.onMonthlyUpdate);
              await loadTrending({timeSpan: 'daily', language,});
              await loadTrending({timeSpan: 'weekly', language,});
              await loadTrending({timeSpan: 'monthly', language,});
            } else {
              trendingEvent.off()
            }
          }}
        </Onmount>
        {state.loading ? (
          <Loading />
        ) : (
          <List
            sections={sectionsFrom(state)}
            renderItem={({ item }) => (
              <RepoCard
                {...item}
                onPress={() => {
                  onSelect(item)
                }}
              />
            )}
            renderSectionHeader={({ section }) => (
              <Header title={section.title} subtitle={section.subtitle} />
            )}
            keyExtractor={({ repo }) => repo}
          />
        )}
      </Fragment>
    )}
  </Stateful>
);

export default TrendingList;
