import React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button title={"Inside"} onPress={() => {
          this.props.navigation.navigate('Inside')
        }}/>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const Inside = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Inside</Text>
  </View>
)

const Tab = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

const Root = createStackNavigator({
  Tab,
  Inside,
}, {
  headerMode: 'none',
});

export default Root
