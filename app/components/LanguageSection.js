import styled from "styled-components";
import React from "react";
import {getLanguageName} from "../network/githubLanguages";
import RepoCard from "./RepoCard";
import {ActivityIndicator, FlatList, Dimensions} from "react-native";
import Stateful, {OnMountAndUnMount} from "../functionComponents/Stateful";
import {loadTrending, trendingEvent} from "../network/githubHTML";

const screenWidth = Dimensions.get('window').width;

const Container = styled.View``;

const Title = styled.Text`
  flex: 1;
  line-height: 33px;
  font-size: 21px;
  font-weight: bold;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  margin-top: 10px;
`;

const SeeAll = ({children, onPress}) => (
  <SeeAll.Button onPress={onPress}>
    <SeeAll.Text>{children}</SeeAll.Text>
  </SeeAll.Button>
);

SeeAll.Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9
})`
  height: 35px;
  justify-content: center;
  padding: 0 20px;
`;

SeeAll.Text = styled.Text`
  font-size: 18px;
  color: #007aff;
`;

const Loading = () => (
  <Loading.Container>
    <ActivityIndicator />
    <Loading.Text>Loading repos</Loading.Text>
  </Loading.Container>
);

Loading.Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 228px;
`;

Loading.Text = styled.Text`
  color: lightgray;
  font-size: 13px;
`;

const List = styled(FlatList)`
`;

const LanguageSection = ({ language, onSelect, onSeeAll }) => (
  <Stateful state={{loading: true}}>
    {({ state, setState }) => (
      <Container>
        <OnMountAndUnMount>
          {async ({ mount, object }) => {
            if (mount) {
              object.onUpdate = ({ type, data }) => {
                setState({ loading: type === "loading", data });
              };
              trendingEvent.on(`daily_${language}`, object.onUpdate);
              await loadTrending({timeSpan: 'daily', language,})
            } else {
              trendingEvent.off(`daily_${language}`, object.onUpdate);
            }
          }}
        </OnMountAndUnMount>
        <TopRow>
          <Title>{getLanguageName(language)}</Title>
          <SeeAll onPress={onSeeAll}>See All</SeeAll>
        </TopRow>
        {state.loading && <Loading />}
        {state.data && (
          <List
            stickySectionHeadersEnabled={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={screenWidth * 0.85 + 20}
            snapToAlignment="center"
            decelerationRate={0}
            horizontal
            data={state.data}
            getItemLayout={(data, index) => ({
              length: screenWidth * 0.85 + 20,
              offset: (screenWidth * 0.85 + 20) * index,
              index,
            })}
            renderItem={({ item }) => (
              <RepoCard
                {...item}
                onPress={() => onSelect(item)}
                compact
              />
            )}
            keyExtractor={({ repo }) => repo}
          />
        )}
      </Container>
    )}
  </Stateful>
);

export default LanguageSection;
