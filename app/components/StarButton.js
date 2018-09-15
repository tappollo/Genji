import React from "react";
import styled from "styled-components";

const StarButton = ({ repo, outline, selected }) => (
  <StarButton.Container outline={outline} selected={selected}>
    <StarButton.Text selected={selected}>Star</StarButton.Text>
  </StarButton.Container>
);

StarButton.Container = styled.TouchableOpacity`
  padding: 0 20px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ selected, outline }) =>
    outline ? "transparent" : selected ? "#007AFF" : "#F0F1F6"};
  justify-content: center;
  align-items: center;
`;

StarButton.Text = styled.Text`
  color: ${({ selected, outline }) =>
    !outline && selected ? "white" : "#007AFF"};
  font-size: 15px;
  font-weight: 700;
`;

export default StarButton;
