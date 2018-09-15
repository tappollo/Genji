import React from "react";
import styled from "styled-components";
import Stateful, { Onmount } from "../functionComponents/Stateful";
import RepoCard from "../components/RepoCard";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";
import { getReadmeContent } from "../network/githubAPI";
import Readme from "../components/Readme";
import { ActivityIndicator, Animated, ScrollView } from "react-native";
import { BlurView } from "react-native-blur";
import StarButton from "../components/StarButton";
import Ionicons from "react-native-vector-icons/Ionicons";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Loading = () => (
  <Loading.Container>
    <ActivityIndicator />
    <Loading.Text>Loading Readme</Loading.Text>
  </Loading.Container>
);

Loading.Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

Loading.Text = styled.Text`
  color: lightgray;
  font-size: 13px;
  margin-left: 10px;
`;

const Banner = ({ style, repo }) => (
  <Banner.Container style={style}>
    <Banner.BlurBackground />
    <Banner.Texts>
      <Banner.Title>{repo.repo}</Banner.Title>
      <Banner.Subtitle>{repo.desc}</Banner.Subtitle>
    </Banner.Texts>
    <StarButton selected/>
  </Banner.Container>
);

Banner.Texts = styled.View`
  flex: 1;
  margin-right: 6px;
`;

Banner.Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #444546;
  font-size: 16px;
  font-weight: 700;
`;

Banner.Subtitle = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-top: 3px;
  color: #464749;
  font-size: 12px;
  line-height: 14px;
`;

Banner.Container = styled(Animated.View)`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: ${getBottomSpace() + 10};
  height: 68px;
  border-radius: 15px;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

Banner.BlurBackground = styled(BlurView).attrs({
  blurType: "xlight"
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const TopSpacer = styled.View`
  height: ${getStatusBarHeight(true) + 44};
`;

const BottomSpacer = styled.View`
  height: ${getBottomSpace() + 100};
`;

const CloseButton = styled(Ionicons).attrs({
  name: "ios-close-circle",
  size: 30,
})`
  color: gray;
  position: absolute;
  top: ${getStatusBarHeight(true)};
  right: 10px;
  padding: 10px;
`;

const RepoDetailPage = ({ navigation }) => (
  <Stateful state={{ showBanner: new Animated.Value(0) }}>
    {({ state, setState, object }) => (
      <Container>
        <ScrollView
          scrollEventThrottle={50}
          onScroll={event => {
            const throttle = 300;
            const newOffset = event?.nativeEvent.contentOffset.y;
            if (object.previousOffset < throttle && newOffset > throttle) {
              Animated.spring(state.showBanner, {
                toValue: 1
              }).start();
            } else if (
              object.previousOffset > throttle &&
              newOffset < throttle
            ) {
              Animated.spring(state.showBanner, {
                toValue: 0
              }).start();
            }
            object.previousOffset = newOffset;
          }}
        >
          <TopSpacer />
          <RepoCard {...navigation.getParam("repo")} />
          <Onmount>
            {async () => {
              setState({
                content: await getReadmeContent(
                  navigation.getParam("repo").repo
                )
              });
            }}
          </Onmount>
          {!state.ready && <Loading />}
          <Readme
            style={{opacity: state.ready ? 1 : 0}}
            onReady={() => { !state.ready && setState({ ready: true }); }}
            repo={ navigation.getParam("repo").repo }
          />
          <BottomSpacer />
        </ScrollView>
        <CloseButton onPress={() => navigation.pop()}/>
        <Banner
          repo={navigation.getParam("repo")}
          style={{
            bottom: state.showBanner.interpolate({
              inputRange: [0, 1],
              outputRange: [-70, getBottomSpace() + 10]
            })
          }}
        />
      </Container>
    )}
  </Stateful>
);

export default RepoDetailPage;
