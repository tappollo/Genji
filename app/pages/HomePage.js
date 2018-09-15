import { createBottomTabNavigator } from "react-navigation";
import TodayPage from "./TodayPage";
import StarredPage from "./StarredPage";
import LanguagesPage from "./LanguagesPage";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Icons = (focused) => ({
  TodayPage: "ios-today",
  StarredPage: focused ? "ios-star" : "ios-star-outline",
  LanguagesPage: focused ? "ios-square" : 'ios-square-outline',
});

const HomePage = createBottomTabNavigator(
  {
    TodayPage,
    LanguagesPage,
    StarredPage,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = Icons(focused)[routeName];
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      inactiveTintColor: "gray"
    }
  }
);

export default HomePage;
