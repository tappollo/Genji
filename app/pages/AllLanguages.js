import React from "react";
import styled from 'styled-components';
import {FlatList, StyleSheet} from 'react-native'
import {getLanguageDetail, githubAllLanguages} from "../network/githubLanguages";
import {getBottomSpace, getStatusBarHeight} from "react-native-iphone-x-helper";
import {BackButton} from "./RepoDetailPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import {BackButtonWithShadow} from "../components/BackButton";

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-top: ${getStatusBarHeight(true)};
`;

const Cell = ({name, color, onPress}) => (
  <Cell.Container onPress={onPress}>
    <Cell.Dot color={color}/>
    <Cell.Title>{name}</Cell.Title>
    <RightArrow />
  </Cell.Container>
);


Cell.Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9
})`
  height: 44px;  
  margin-left: 15px;
  padding-right: 10px;
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
  flex: 1;
  color: black;
  font-size: 16px;
`;

const TopSpacer = styled.View`
  height: 44px;
`;
const BottomSpacer = styled.View`
  height: ${getBottomSpace()};
`;


const RightArrow = styled(Ionicons).attrs({
  name: 'ios-arrow-forward',
  size: 20,
})`
  color: gray;
`;

const AllLanguages = ({navigation}) => (
  <Container>
    <FlatList
      ListHeaderComponent={TopSpacer}
      ListFooterComponent={BottomSpacer}
      data={githubAllLanguages}
      keyExtractor={value => value}
      renderItem={({item}) => (
        <Cell {...getLanguageDetail(item)} onPress={() => {
          navigation.navigate('LanguageDetailPage', {lang: item})
        }}/>
      )}
    />
    <BackButtonWithShadow onPress={() => navigation.pop()}/>
  </Container>
);

export default AllLanguages;