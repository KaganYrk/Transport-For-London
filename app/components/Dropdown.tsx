/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Text from './Text';

export const Style = StyleSheet.create({
  button: { height: 60, width: '100%', flexDirection: 'row', backgroundColor: 'gray', alignItems: 'center', borderRadius: 5 },
  listContainer: { position: 'absolute' },
});

const List = ({ data, listContainerStyle, visible, setVisible, displayedRowItemValue, onSelect, setSelectedObject, rowStyle, textStyle }: IList) =>
  (visible ?
    (
      <Animated.View entering={FadeIn} exiting={FadeOut} style={[Style.listContainer, listContainerStyle]}>
        {data?.map((value, index) => (
          <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => { setSelectedObject(value); setVisible(false); onSelect(value); }} style={[{ height: 30, justifyContent: 'center' }, index === data.length - 1 ? { borderBottomLeftRadius: 5, borderBottomRightRadius: 5 } : null, rowStyle]}>
            <Text style={textStyle}>{displayedRowItemValue(value)}</Text>
          </TouchableOpacity>
        ))}

      </Animated.View>
    ) : null);

const Dropdown = ({ left, right, data, displayedRowItemValue, displayedButtonValue, listContainerStyle, defaultValue = {}, buttonTitle, rowStyle, buttonStyle, buttonTextStyle, onSelect, rowTextStyle, containerStyle = { zIndex: 100 } }: IDrowdown) => {
  const buttonRef = React.useRef<TouchableOpacity>(null);
  const [visible, setVisible] = useState(false);
  const [selectedObject, setSelectedObject] = useState(defaultValue);
  const [cord, setCord] = useState<{ x: number, y: number, height: number, width: number }>({ x: 0, y: 0, height: 0, width: 0 });

  return (
    <View style={containerStyle}>
      <TouchableOpacity onLayout={event => setCord(event.nativeEvent.layout)} ref={buttonRef} onPress={() => setVisible(!visible)} style={[Style.button, buttonStyle]}>
        {left}
        <Animated.Text numberOfLines={1} key={displayedButtonValue(selectedObject)} entering={FadeIn.delay(100)} exiting={FadeOut} style={[buttonTextStyle, { flex: 1 }]}>
          {(Object.keys(selectedObject).length === 0 && buttonTitle) || displayedButtonValue(selectedObject)}
        </Animated.Text>
        {right}
      </TouchableOpacity>
      <List data={data} rowStyle={rowStyle} textStyle={rowTextStyle} onSelect={onSelect} visible={visible} displayedRowItemValue={displayedRowItemValue} setVisible={setVisible} setSelectedObject={setSelectedObject} listContainerStyle={{ width: cord?.width, left: cord?.x, top: cord?.y + cord?.height, ...listContainerStyle }} />
    </View>
  );
};

export default Dropdown;

interface IDrowdown {
  data: Array<{ [key: string]: any }> | Array<any>| undefined,
  buttonStyle?: StyleProp<ViewStyle>,
  displayedRowItemValue: (item: any) => string,
  onSelect: (item: any) => void,
  displayedButtonValue: (item: any) => string,
  containerStyle?:StyleProp<ViewStyle>
  buttonTitle?: string,
  rowStyle?: StyleProp<ViewStyle>
  defaultValue?: any,
  rowTextStyle?: StyleProp<TextStyle>,
  buttonTextStyle?: StyleProp<TextStyle>,
  listContainerStyle?: TextStyle,
  left?:React.ReactNode,
  right?:React.ReactNode,

}
interface IList {
  data: Array<{ [key: string]: any }> | Array<any>| undefined,
  listContainerStyle: ViewStyle,
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedObject: React.Dispatch<React.SetStateAction<object>>,
  displayedRowItemValue: (item: object) => string,
  onSelect: (item: object) => void,
  rowStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>,

}
