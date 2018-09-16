import React from "react";
import { View, Animated, TouchableWithoutFeedback, Dimensions } from "react-native";
import styled, {css} from "styled-components";
import Ionicons from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import Stateful from "../functionComponents/Stateful";
import StarButton from "./StarButton";

const fullStyle = css`
  box-shadow: 0 12px 14px rgba(0, 0, 0, 0.1);
  margin: 10px 20px;
`;

const screenWidth = Dimensions.get('window').width;

const compactStyle = css`
  margin: 15px 0 20px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: ${screenWidth * 0.85};
`;

const Container = styled(Animated.View)`
  padding: 15px;
  border-radius: 15px;
  ${({compact}) => compact ? compactStyle : fullStyle};
  background-color: white;
`;

const Repo = styled.Text`
  color: #0366d6;
  font-size: 20px;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
`;

const Dot = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ color }) => color || "gray"};
  margin-right: 5px;
`;

const Desc = styled.Text`
  color: #586069;
  font-size: 14px;
  line-height: 21px;
  margin: 10px 0;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  flex-wrap: wrap;
`;

const InfoText = styled.Text`
  color: #586069;
  margin-right: 16px;
  font-size: 12px;
`;

const InfoIcon = styled(Ionicons).attrs({
  size: 15
})`
  color: #586069;
  margin-right: 5px;
`;

const Avatar = styled(FastImage)`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background-color: lightpink;
  margin-right: 3px;
`;

const RepoCard = ({
  repo,
  desc,
  color,
  lang,
  stars,
  forks,
  avatars,
  activity,
  onPress,
  compact
}) => (
  <Stateful state={{ zoom: new Animated.Value(0) }}>
    {({ state, setState }) => (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={() => {
          Animated.spring(state.zoom, {
            toValue: 1
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(state.zoom, {
            toValue: 0
          }).start();
        }}
      >
        <Container
          compact={compact}
          style={{
            transform: [
              {
                scale: state.zoom.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.95]
                })
              }
            ]
          }}
        >
          <Repo numberOfLines={compact ? 1 : 0}>
            <Repo>{repo.split("/")[0]} / </Repo>
            <Repo bold>{repo.split("/")[1]}</Repo>
          </Repo>
          <Desc numberOfLines={compact ? 2 : 0}>{desc}</Desc>
          <View style={{flex: 1}}/>
          <InfoRow>
            <Dot color={color} />
            <InfoText>{lang}</InfoText>
            <InfoIcon name="ios-star" />
            <InfoText>{stars}</InfoText>
            <InfoIcon name="ios-git-merge" />
            <InfoText>{forks}</InfoText>
            <View style={{ flex: 1 }} />
            <InfoText style={{marginRight: 0}}>{activity}</InfoText>
          </InfoRow>
          <InfoRow>
            <InfoText style={{ marginRight: 5 }}>Built by</InfoText>
            {avatars.map(url => (
              <Avatar key={url} source={{ uri: url }} />
            ))}
            <View style={{ flex: 1 }} />
            <StarButton />
          </InfoRow>
        </Container>
      </TouchableWithoutFeedback>
    )}
  </Stateful>
);

export default RepoCard;
