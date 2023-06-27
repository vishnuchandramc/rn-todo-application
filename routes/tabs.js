import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../src/screens/main';
import Settings from '../src/screens/Settings';
import Feather from 'react-native-vector-icons/Feather';
import New from '../src/screens/new';
import Bottomsheet from '../src/screens/Bottomsheet';
import HapticFeedback from 'react-native-haptic-feedback';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        // tabBarIconStyle: {display: 'none'},
        tabBarStyle: {
          // position: 'absolute',
          backgroundColor: '#090C10',
          borderTopColor: '#090C10',
          height: 100,
        },
      }}>
      <Tab.Screen
        name="home"
        component={Main}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Feather
              name={'home'}
              color={color}
              size={24}
              style={{
                backgroundColor: focused ? 'rgba(85,104,153, 0.25)' : null,
                paddingHorizontal: focused ? 30 : 0,
                paddingVertical: focused ? 10 : 0,
                borderRadius: focused ? 30 : 0,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="new"
        component={New}
        options={{
          tabBarButton: () => <Bottomsheet />,
        }}
      />
      {/* <Tab.Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Feather
              name={'plus'}
              color={color}
              size={size}
              style={{
                backgroundColor: '#465AF7',
                padding: 30,
                borderRadius: 50,
              }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Feather
              name={'settings'}
              color={color}
              size={24}
              style={{
                backgroundColor: focused ? 'rgba(85,104,153, 0.25)' : null,
                paddingHorizontal: focused ? 30 : 0,
                paddingVertical: focused ? 10 : 0,
                borderRadius: focused ? 30 : 0,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
