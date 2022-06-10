import React, { ReactNode } from 'react';
import { StyleProp, Text as BasicText, TextProps, TextStyle } from 'react-native';

export default class Text extends React.PureComponent<IText & TextProps> {
  render(): ReactNode {
    const { type, style, children, props } = this.props;
    return (
      <BasicText adjustsFontSizeToFit style={[{ fontFamily: type, includeFontPadding: false, color: 'black' }, style]} {...props}>
        {children}
      </BasicText>
    );
  }
}

interface IText {
  type?: 'regular' | 'medium' | 'semibold' | 'bold',
  children: ReactNode,
  style?: StyleProp<TextStyle>,
  props?: TextProps
}
