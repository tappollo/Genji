import React from "react";
import styled from 'styled-components';
import {FlatList, StyleSheet} from 'react-native'
import {getLanguageDetail, githubAllLanguages} from "../network/githubLanguages";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Cell = ({name, color}) => (
  <Cell.Container>
    <Cell.Dot/>
    {/*<Cell.Title>{name}</Cell.Title>*/}
  </Cell.Container>
);


Cell.Container = styled.TouchableOpacity`
  height: 44px;  
  margin-left: 15px;
  border-bottom-color: #e5e5ea;
  border-bottom-width: ${StyleSheet.hairlineWidth};
  align-items: center;
  flex-direction: row;
`;

const dotSize = 20;

Cell.Dot = styled.View`
  width: ${dotSize};
  height: ${dotSize};
  border-radius: ${dotSize / 2};
  margin-right: 15px;
  background-color: ${({color}) => color || 'gray'};
`;

Cell.Title = styled.Text`
  color: black;
`;


const AllLanguages = () => (
  <Container>
    <FlatList
      data={githubAllLanguages}
      keyExtractor={value => value}
      renderItem={({item}) => (
        <Cell {...getLanguageDetail(item)}/>
      )}
    />
  </Container>
);

export default AllLanguages;