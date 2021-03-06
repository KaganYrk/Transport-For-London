import React, { ReactNode } from 'react';
import { ColorValue, ScrollView, StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout({ children, scroll, style, backgroundColor, statusBarColor, headerless }: ILayout) {
  const insets = useSafeAreaInsets();
  if (scroll) {
    return (
      <View style={{ flex: 1, backgroundColor: statusBarColor }}>
        <StatusBar animated translucent backgroundColor={statusBarColor} />

        <ScrollView style={[{ backgroundColor }, style]}>
          {children}
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: statusBarColor }}>
      <StatusBar animated translucent backgroundColor={statusBarColor} />
      <View style={[{ flex: 1, marginTop: headerless ? insets.top : 0, backgroundColor }, style]}>
        {children}
      </View>
    </View>
  );
}
interface ILayout {
  children: ReactNode,
  style?: StyleProp<ViewStyle>
  statusBarColor?: string,
  scroll?: boolean,
  backgroundColor?: ColorValue,
  headerless?:boolean,
}
