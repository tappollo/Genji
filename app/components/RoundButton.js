import React from "react";
import styled from "styled-components";

const RoundButton = ({ title, selected }) => (
  <RoundButton.Container selected={selected}>
    <RoundButton.Text selected={selected}>{title}</RoundButton.Text>
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
