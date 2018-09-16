import React from "react";
import styled from 'styled-components';

const RectangleButton = ({title, onPress, style}) => (
  <RectangleButton.Button onPress={onPress} style={style}>
    <RectangleButton.Text>{title}</RectangleButton.Text>
  </RectangleButton.Button>
);

RectangleButton.Button = styled.TouchableOpacity`
  height: 50px;
  border-radius: 12px;
  margin: 0 20px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background-color: #f0f0f7;
`;

RectangleButton.Text = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #157afb;
`;

export default RectangleButton
