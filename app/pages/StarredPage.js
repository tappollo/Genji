import styled from "styled-components";
import React, { Fragment } from "react";
import githubOauth from "../network/githubOauth";
import { connect } from "react-redux";
import LoginView from "../components/LoginView";
import gql from "graphql-tag";
import { ActivityIndicator, FlatList } from "react-native";
import { Query } from "react-apollo";
import RepoCard from "../components/RepoCard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Stateful from "../functionComponents/Stateful";
import RectangleButton from "../components/RectangleButton";

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
      starredRepositories(
        first: 20
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
        }
        nodes {
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
`;

const ErrorView = styled.Text`
  color: lightgray;
  align-items: center;
  margin: 0 20px;
  text-align: center;
`;

const Cell = ({
  nameWithOwner,
  starredAt,
  description,
  stargazers,
  forks,
  mentionableUsers,
  primaryLanguage
}) => (
  <RepoCard
    repo={nameWithOwner}
    activity={`starred ${dayjs(starredAt).fromNow()}`}
    desc={description}
    stars={stargazers.totalCount}
    forks={forks.totalCount}
    avatars={mentionableUsers.nodes.map(a => a.avatarUrl)}
    lang={primaryLanguage?.name || "Unknown"}
    color={primaryLanguage?.color || "gray"}
    starred={true}
  />
);

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

const StarredPage = ({ user, updateUser, updateStarred }) => (
  <Stateful>
    {({ state, setState }) => (
      <Container>
        {user ? (
          <Query
            query={STARRED_QUERY}
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
              const nodes = data.viewer.starredRepositories.nodes;
              const edges = data.viewer.starredRepositories.edges;
              const dataSource = nodes.map((node, index) => ({
                ...node,
                ...edges[index]
              }));
              return (
                <FlatList
                  data={dataSource}
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
                              if (
                                preRepos.pageInfo.endCursor ===
                                nextRepos.pageInfo.endCursor
                              ) {
                                return prev;
                              }
                              return {
                                viewer: {
                                  ...prev.viewer,
                                  starredRepositories: {
                                    ...preRepos,
                                    edges: [
                                      ...preRepos.edges,
                                      ...nextRepos.edges
                                    ],
                                    nodes: [
                                      ...preRepos.nodes,
                                      ...nextRepos.nodes
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
                  keyExtractor={value => value.nameWithOwner}
                  renderItem={({ item }) => <Cell {...item} />}
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
    updateUser: token => dispatch({ type: "UPDATE_USER", payload: token })
  })
)(StarredPage);
