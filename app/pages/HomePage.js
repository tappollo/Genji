import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import TodayPage from "./TodayPage";
import StarredPage from "./StarredPage";
import LanguagesPage from "./LanguagesPage";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import RepoDetailPage from "./RepoDetailPage";
import AllLanguages from "./AllLanguages";
import LanguageDetailPage from "./LanguageDetailPage";

const Icons = focused => ({
  TodayPage: "ios-today",
  StarredPage: focused ? "ios-star" : "ios-star-outline",
  LanguagesPage: focused ? "ios-square" : "ios-square-outline"
});

const Tabs = createBottomTabNavigator(
  {
    TodayPage,
    LanguagesPage,
    StarredPage
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = Icons(focused)[routeName];
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      inactiveTintColor: "gray"
    }
  }
);

const HomePage = createStackNavigator(
  {
    Tabs,
    AllLanguages,
    RepoDetailPage,
    LanguageDetailPage,
  },
  {
    headerMode: "none",
  }
);

export default HomePage;
