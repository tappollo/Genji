import styled from "styled-components";
import React, { Fragment } from "react";
import githubOauth from "../network/githubOauth";
import { connect } from "react-redux";
import LoginView from "../components/LoginView";
import gql from "graphql-tag";
import { ActivityIndicator, FlatList } from "react-native";
import { Query } from "react-apollo";
import {Alert} from 'react-native';
import RepoCard from "../components/RepoCard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Stateful from "../functionComponents/Stateful";
import RectangleButton from "../components/RectangleButton";
import RoundButton from "../components/RoundButton";

dayjs.extend(relativeTime);

const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  padding-top: ${getStatusBarHeight(true)};
`;

const STARRED_QUERY = gql`
  query Starred($after: String) {
    viewer {
      name
      starredRepositories(
        first: 10
        after: $after
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          starredAt
          node {
            nameWithOwner
            description
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            mentionableUsers(first: 5) {
              nodes {
                avatarUrl
              }
            }
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

const ErrorView = styled.Text`
  color: lightgray;
  align-items: center;
  margin: 0 20px;
  text-align: center;
`;

const Cell = ({
  node: {
    nameWithOwner,
    description,
    stargazers,
    forks,
    mentionableUsers,
    primaryLanguage
  },
  starredAt,
  onSelect
}) => {
  const item = {
    repo: nameWithOwner,
    activity: `starred ${dayjs(starredAt).fromNow()}`,
    desc: description,
    stars: stargazers.totalCount,
    forks: forks.totalCount,
    avatars: mentionableUsers.nodes.map(a => a.avatarUrl),
    lang: primaryLanguage?.name || "Unknown",
    color: primaryLanguage?.color || "gray",
    starred: true
  };
  return <RepoCard {...item} onPress={() => onSelect(item)} />;
};

const Header = ({ title, subtitle, onPress }) => (
  <Header.Container>
    <Header.Texts>
      <Header.Title>{title}</Header.Title>
      <Header.Subtitle>{subtitle}</Header.Subtitle>
    </Header.Texts>
    <RoundButton title="Log out" onPress={onPress}/>
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

const Footer = ({ error, loading, hasMore, onPress }) => (
  <Footer.Container>
    {loading ? (
      <ActivityIndicator />
    ) : error ? (
      <Fragment>
        <RectangleButton
          onPress={onPress}
          title="Retry"
          style={{ marginVertical: 10 }}
        />
        <Footer.Error>{error.message}</Footer.Error>
      </Fragment>
    ) : hasMore ? (
      <RectangleButton onPress={onPress} title="Load More" />
    ) : (
      <Footer.Error>All loaded</Footer.Error>
    )}
  </Footer.Container>
);

Footer.Container = styled.View`
  min-height: 80px;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
`;

Footer.Error = styled.Text`
  color: lightgray;
  font-size: 12px;
  margin: 0 20px;
  text-align: center;
`;

const StarredPage = ({ navigation, user, updateUser, updateStarred }) => (
  <Stateful>
    {({ state, setState }) => (
      <Container>
        {user ? (
          <Query
            query={STARRED_QUERY}
            onCompleted={data => {
              const entries = data.viewer.starredRepositories.edges.map(
                a => a.node.nameWithOwner
              );
              updateStarred(entries);
            }}
            variables={{
              after: null
            }}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data, fetchMore }) => {
              if (loading && !Boolean(Object.keys(data)[0])) {
                return <ActivityIndicator />;
              }
              if (error) {
                return (
                  <Fragment>
                    <ErrorView>{error.message}</ErrorView>;
                    <RectangleButton
                      onPress={onPress}
                      title="Retry"
                      style={{ marginTop: 20 }}
                    />
                  </Fragment>
                );
              }
              return (
                <FlatList
                  data={data.viewer.starredRepositories.edges}
                  ListHeaderComponent={() => (
                    <Header
                      title={data.viewer.name}
                      subtitle={`${
                        data.viewer.starredRepositories.totalCount
                      } repos starred`}
                      onPress={() => {
                        Alert.alert("Are you sure", null, [
                          {text: 'Cancel', style: 'cancel'},
                          {text: 'Logout', onPress: () => updateUser(null), style: 'destructive'}
                        ]);
                      }}
                    />
                  )}
                  ListFooterComponent={() => (
                    <Footer
                      hasMore={
                        data.viewer.starredRepositories.pageInfo.hasNextPage
                      }
                      loading={state.loadingMore}
                      error={state.loadingMoreError}
                      onPress={async () => {
                        setState({ loadingMore: true, loadingMoreError: null });
                        try {
                          await fetchMore({
                            variables: {
                              after:
                                data.viewer.starredRepositories.pageInfo
                                  .endCursor
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                              if (!fetchMoreResult) {
                                return prev;
                              }
                              const preRepos = prev.viewer.starredRepositories;
                              const nextRepos =
                                fetchMoreResult.viewer.starredRepositories;
                              return {
                                viewer: {
                                  ...fetchMoreResult.viewer,
                                  starredRepositories: {
                                    ...nextRepos,
                                    edges: [
                                      ...preRepos.edges,
                                      ...nextRepos.edges
                                    ]
                                  }
                                }
                              };
                            }
                          });
                          setState({ loadingMore: false });
                        } catch (e) {
                          setState({ loadingMore: false, loadingMoreError: e });
                        }
                      }}
                    />
                  )}
                  keyExtractor={value => value.node.nameWithOwner}
                  renderItem={({ item }) => (
                    <Cell
                      {...item}
                      onSelect={repo =>
                        navigation.navigate("RepoDetailPage", { repo })
                      }
                    />
                  )}
                />
              );
            }}
          </Query>
        ) : (
          <LoginView
            onPress={async () => {
              const { access_token } = await githubOauth.start();
              updateUser(access_token);
            }}
          />
        )}
      </Container>
    )}
  </Stateful>
);

StarredPage.navigationOptions = {
  title: "Star"
};

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    updateUser: token => dispatch({ type: "UPDATE_USER", payload: token }),
    updateStarred: payload => dispatch({ type: "UPDATE_FROM_GRAPHQL", payload }),
  })
)(StarredPage);
