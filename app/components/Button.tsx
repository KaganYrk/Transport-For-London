import { StyleProp, StyleSheet, TextProps, TextStyle, View, ViewStyle } from 'react-native';
import { BorderlessButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import React from 'react';
import Text from './Text';

const styles = StyleSheet.create({
  buttonStyle: { height: 60, borderRadius: 12, justifyContent: 'center' },
});

export default function Button({ children, type = 'medium', onPress, style, containerStyle, props, title, textStyle }: IButton) {
  return (
    <View style={containerStyle}>
      {/* @ts-ignore */}
      <TouchableWithoutFeedback style={[styles.buttonStyle, style]}>
        <BorderlessButton rippleColor="black" {...props} style={[styles.buttonStyle, style]} onPress={onPress}>
          <View style={[{ alignItems: 'center', marginHorizontal: 32 }]} accessible accessibilityRole="button">
            {children}
            <Text adjustsFontSizeToFit={false} style={[{ fontSize: 16, textAlign: 'center' }, textStyle]}>
              {title}
            </Text>
          </View>
        </BorderlessButton>
      </TouchableWithoutFeedback>
    </View>
  );
}
interface IButton {
    type?: 'medium' | 'small',
    title?: string,
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>
    containerStyle?: StyleProp<ViewStyle>,
    children?: React.ReactNode,
    props?: TextProps
}
