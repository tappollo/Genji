import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";

const RoundButton = ({ title, selected, onPress, loading }) => (
  <RoundButton.Container selected={selected} onPress={onPress}>
    {loading ? (
      <ActivityIndicator />
    ) : (
      <RoundButton.Text selected={selected}>{title}</RoundButton.Text>
    )}
  </RoundButton.Container>
);

RoundButton.Container = styled.TouchableOpacity`
  padding: 0 20px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ selected }) => (selected ? "#007AFF" : "#F0F1F6")};
  justify-content: center;
  align-items: center;
`;

RoundButton.Text = styled.Text`
  color: ${({ selected }) => (selected ? "white" : "#007AFF")};
  font-size: 15px;
  font-weight: 700;
`;

export default RoundButton;
