import styled from "styled-components";
import {ActivityIndicator, SectionList} from "react-native";
import Stateful, {OnMountAndUnMount} from "../functionComponents/Stateful";
import React, {Fragment} from "react";
import RepoCard from "./RepoCard";
import {loadTrending, trendingEvent} from "../network/githubHTML";
import dayjs from "dayjs";
import {getLanguageName, isLanguageFeatured} from "../network/githubLanguages";
import RoundButton from "./RoundButton";
import PinLanguageButton from "./PinLanguageButton";

const Header = ({ title, subtitle, language }) => (
  <Header.Container>
    <Header.Texts>
      <Header.Title>{title}</Header.Title>
      <Header.Subtitle>{subtitle}</Header.Subtitle>
    </Header.Texts>
    {language ? <PinLanguageButton language={language} /> : null}
  </Header.Container>
);

Header.Container = styled.View`
  padding: 26px 20px 5px;
  flex-direction: row;
  align-items: center;
`;

Header.Texts = styled.View`
  flex: 1;
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

const sectionsFrom = ({ daily, weekly, monthly, language }) => {
  const sections = [];
  if (daily) {
    const subtitle = dayjs()
      .format("dddd MMMM D")
      .toUpperCase();
    sections.push({
      data: daily,
      title: getLanguageName(language) || "Today",
      subtitle: language ? "TODAY " + subtitle : subtitle
    });
  }
  if (weekly) {
    sections.push({
      data: weekly,
      title: "This Week",
      subtitle:
        "FROM " +
        dayjs()
          .subtract(1, "week")
          .format("dddd MMMM D")
          .toUpperCase()
    });
  }
  if (monthly) {
    sections.push({
      data: monthly,
      title: "This Month",
      subtitle:
        "FROM " +
        dayjs()
          .subtract(1, "month")
          .format("dddd MMMM D")
          .toUpperCase()
    });
  }
  return sections;
};

const TopSpacer = styled.View`
  height: 44px;
`;

const TrendingList = ({ language = "", onSelect }) => (
  <Stateful state={{ language }}>
    {({ state, setState, object, getState }) => (
      <Fragment>
        <OnMountAndUnMount>
          {async ({ mount }) => {
            if (mount) {
              object.onDailyUpdate = ({ type, data }) => {
                setState({
                  loading: type === "loading",
                  daily: data || getState().daily
                });
              };
              object.onWeeklyUpdate = ({ type, data }) => {
                setState({ weekly: data });
              };
              object.onMonthlyUpdate = ({ type, data }) => {
                setState({ monthly: data });
              };
              trendingEvent.on(`daily_${language}`, object.onDailyUpdate);
              trendingEvent.on(`weekly_${language}`, object.onWeeklyUpdate);
              trendingEvent.on(`weekly_${language}`, object.onMonthlyUpdate);
              await loadTrending({ timeSpan: "daily", language });
              await loadTrending({ timeSpan: "weekly", language });
              await loadTrending({ timeSpan: "monthly", language });
            } else {
              trendingEvent.off(`daily_${language}`, object.onDailyUpdate);
              trendingEvent.off(`weekly_${language}`, object.onWeeklyUpdate);
              trendingEvent.off(`monthly_${language}`, object.onMonthlyUpdate);
            }
          }}
        </OnMountAndUnMount>
        {(state.loading && !state.refreshing) ? (
          <Loading />
        ) : (
          <List
            refreshing={Boolean(state.refreshing)}
            onRefresh={async () => {
              try {
                setState({refreshing: true});
                await loadTrending({ timeSpan: "daily", language, force: true });
              } finally {
                setState({refreshing: false});
                await loadTrending({ timeSpan: "weekly", language, force: true });
                await loadTrending({ timeSpan: "monthly", language, force: true });
              }
            }}
            initialNumToRender={6}
            ListHeaderComponent={language && TopSpacer}
            sections={sectionsFrom(state)}
            renderItem={({ item }) => (
              <RepoCard
                {...item}
                onPress={() => {
                  onSelect(item);
                }}
              />
            )}
            renderSectionHeader={({ section }) => (
              <Header
                language={language}
                title={section.title}
                subtitle={section.subtitle}
              />
            )}
            keyExtractor={({ repo }) => repo}
          />
        )}
      </Fragment>
    )}
  </Stateful>
);

export default TrendingList;
