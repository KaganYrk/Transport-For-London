import React from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Lines from '../screens/Lines';
import LineDetail from '../screens/LineDetail';

export const navigationRef = createNavigationContainerRef();

const MainStack = createStackNavigator<MainStackParamList>();

const Main = () => (
  <NavigationContainer ref={navigationRef}>
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen component={Lines} name="Lines" />
      <MainStack.Screen component={LineDetail} name="LineDetail" options={{ presentation: 'transparentModal' }} />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default Main;

export type MainStackParamList = {
    Lines:undefined
    LineDetail:undefined
  };
