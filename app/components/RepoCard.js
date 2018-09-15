import React from "react";
import { View, Animated, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import Ionicons from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import Stateful from "../functionComponents/Stateful";

const Container = styled(Animated.View)`
  margin: 10px 20px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 12px 14px rgba(0, 0, 0, 0.1);
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

const Star = styled.TouchableOpacity`
  padding: 0 20px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ selected }) => (selected ? "#007AFF" : "#F0F1F6")};
  justify-content: center;
  align-items: center;
`;

Star.Text = styled.Text`
  color: ${({ selected }) => (selected ? "white" : "#007AFF")};
  font-size: 15px;
  font-weight: 700;
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
  onPress
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
          <Repo>
            <Repo>{repo.split("/")[0]} / </Repo>
            <Repo bold>{repo.split("/")[1]}</Repo>
          </Repo>
          <Desc>{desc}</Desc>
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
            <Star>
              <Star.Text>Star</Star.Text>
            </Star>
          </InfoRow>
        </Container>
      </TouchableWithoutFeedback>
    )}
  </Stateful>
);

export default RepoCard;
