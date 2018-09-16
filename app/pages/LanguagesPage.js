import styled from "styled-components";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import React from "react";
import LanguageSection from "../components/LanguageSection";
import { FlatList } from "react-native";
import {connect} from "react-redux";

const Container = styled.View`
  padding-top: ${getStatusBarHeight(true)};
  flex: 1;
  background-color: white;
`;

const Header = ({ children }) => (
  <Header.Container>
    <Header.Text>{children}</Header.Text>
  </Header.Container>
);

Header.Container = styled.View`
  margin-left: 20px;
  margin-top: 30px;
  padding-bottom: 16px;
  border-bottom-color: #e5e5ea;
  border-bottom-width: 1px;
`;

Header.Text = styled.Text`
  font-size: 34px;
  font-weight: bold;
  line-height: 41px;
`;

const Footer = ({ onPress, title }) => (
  <Footer.Container onPress={onPress}>
    <Footer.Text>{title}</Footer.Text>
  </Footer.Container>
);

Footer.Text = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #157afb;
`;

Footer.Container = styled.TouchableOpacity`
  margin: 20px 20px 40px;
  height: 50px;
  border-radius: 12px;
  background-color: #f0f0f7;
  justify-content: center;
  align-items: center;
`;

const LanguagesPage = ({ navigation, featuredLanguages }) => (
  <Container>
    <FlatList
      ListHeaderComponent={() => <Header>Featured</Header>}
      ListFooterComponent={() => (
        <Footer
          onPress={() => navigation.navigate("AllLanguages")}
          title="Show all languages"
        />
      )}
      renderItem={({ item }) => (
        <LanguageSection
          language={item}
          onSeeAll={() =>
            navigation.navigate("LanguageDetailPage", { lang: item })
          }
          onSelect={item =>
            navigation.navigate("RepoDetailPage", { repo: item })
          }
        />
      )}
      data={featuredLanguages}
      keyExtractor={value => value}
    />
  </Container>
);

LanguagesPage.navigationOptions = {
  title: "All Languages"
};

export default connect(state => ({
  featuredLanguages: state.featured
}))(LanguagesPage);
