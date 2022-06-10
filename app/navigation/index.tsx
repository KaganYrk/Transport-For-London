/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Lines from '../screens/Lines/Lines';
import LineDetail from '../screens/LineDetail/LineDetail';
import StopDetail from '../screens/StopDetail/StopDetail';

export const navigationRef = createNavigationContainerRef();

const MainStack = createStackNavigator<MainStackParamList>();

const Main = () => {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator screenOptions={({ navigation }) => ({ headerShown: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: { height: insets.top + 44 },
        headerTitleStyle: { fontSize: 20, color: 'black' },
        headerShadowVisible: false,
        headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('QrCamera')}><MaterialCommunityIcons style={{ marginRight: 15 }} name="qrcode-scan" size={24} color="black" /></TouchableOpacity> })}
      >
        <MainStack.Screen component={Lines} name="Lines" options={{ headerShown: true }} />
        <MainStack.Screen component={LineDetail} name="LineDetail" />
        <MainStack.Screen component={StopDetail} name="StopDetail" options={{ presentation: 'transparentModal' }} />

      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

export type MainStackParamList = {
    Lines:undefined
    LineDetail:{
      id:string,
      name:string,
      serviceType:string,
    },
    StopDetail:{
      stopId:string,
      lineId:string
    }
  };
