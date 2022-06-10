/* eslint-disable no-unused-expressions */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import { Dimensions, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from './Button';
import Text from './Text';

export const Style = StyleSheet.create({
  button: { height: 60, width: '100%', flexDirection: 'row', backgroundColor: 'gray', alignItems: 'center', borderRadius: 5 },
  listContainer: { position: 'absolute', zIndex: 10, maxHeight: Dimensions.get('window').height - 200 },
});
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
const List = ({ data, scrollEnabled, listContainerStyle, visible, setVisible, displayedRowItemValue, selectedObjects, onSelect, setSelectedObjects, rowStyle, textStyle }: IList) =>
  (visible ?
    (
      <Animated.View entering={FadeIn} exiting={FadeOut} style={[Style.listContainer, listContainerStyle]}>
        <ScrollView bounces={false} scrollEnabled={scrollEnabled}>
          {data?.map((value, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => {
              // @ts-ignore
                if (selectedObjects.some(x => x.index === index)) {
                  // @ts-ignore
                  const position = selectedObjects.map(x => x.index).indexOf(index);
                  const selectedObjectsTemp = [...selectedObjects];
                  selectedObjectsTemp.splice(position, 1);
                  setSelectedObjects(selectedObjectsTemp);
                } else {
                  setSelectedObjects([...selectedObjects, { ...value, index }]);
                }
              }}
              style={[{ height: 60, alignContent: 'center', flexDirection: 'row' }, index === data.length - 1 ? { borderBottomLeftRadius: 5, borderBottomRightRadius: 5 } : null, rowStyle]}
            >

              <Text style={[textStyle, { flex: 1, alignSelf: 'center' }]}>{displayedRowItemValue(value)}</Text>
              { // @ts-ignore
            selectedObjects.some(x => x.index === index) && <AnimatedIcon entering={FadeIn} exiting={FadeOut} name="check" style={{ marginRight: 10, alignSelf: 'center' }} size={15} color="#FFFFFF" />}

            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button textStyle={{ color: '#FFFFFF' }} style={{ backgroundColor: '#5D6375' }} title="Confirm" onPress={() => { setVisible(false); onSelect(selectedObjects); }} />

      </Animated.View>
    ) : null);

const MultipleSelect = ({ left, scrollEnabled = false, right, data, displayedRowItemValue, displayedButtonValue, listContainerStyle, defaultValue = [{}], buttonTitle, rowStyle, buttonStyle, buttonTextStyle, onSelect, rowTextStyle, containerStyle = { zIndex: 100 } }: IDrowdown) => {
  const buttonRef = React.useRef<TouchableOpacity>(null);
  const [visible, setVisible] = useState(false);
  const [selectedObjects, setSelectedObjects] = useState(defaultValue);
  const [cord, setCord] = useState<{ x: number, y: number, height: number, width: number }>({ x: 0, y: 0, height: 0, width: 0 });

  return (
    <View style={containerStyle}>
      <TouchableOpacity onLayout={event => setCord(event.nativeEvent.layout)} ref={buttonRef} onPress={() => setVisible(!visible)} style={[Style.button, buttonStyle]}>
        {left}
        <Animated.Text adjustsFontSizeToFit numberOfLines={4} key={displayedButtonValue(selectedObjects)} entering={FadeIn.delay(100)} exiting={FadeOut} style={[buttonTextStyle, { flex: 1 }]}>
          {(Object.keys(selectedObjects).length === 0 && buttonTitle) || displayedButtonValue(selectedObjects)}
        </Animated.Text>
        {right}
      </TouchableOpacity>
      <List data={data} scrollEnabled={scrollEnabled} rowStyle={rowStyle} textStyle={rowTextStyle} onSelect={onSelect} visible={visible} displayedRowItemValue={displayedRowItemValue} setVisible={setVisible} selectedObjects={selectedObjects} setSelectedObjects={setSelectedObjects} listContainerStyle={{ width: cord?.width, left: cord?.x, top: cord?.y + cord?.height, ...listContainerStyle }} />
    </View>
  );
};

export default MultipleSelect;

interface IDrowdown {
    data: Array<{ [key: string]: any }> | Array<any> | undefined,
    buttonStyle?: StyleProp<ViewStyle>,
    displayedRowItemValue: (item: any) => string,
    onSelect: (item: any) => void,
    displayedButtonValue: (item: any) => string,
    containerStyle?: StyleProp<ViewStyle>
    buttonTitle?: string,
    rowStyle?: StyleProp<ViewStyle>
    defaultValue?: Array<object>,
    rowTextStyle?: StyleProp<TextStyle>,
    buttonTextStyle?: StyleProp<TextStyle>,
    listContainerStyle?: TextStyle,
    left?: React.ReactNode,
    right?: React.ReactNode,
    scrollEnabled?:boolean

}
interface IList {
    data: Array<{ [key: string]: any }> | Array<any> | undefined,
    scrollEnabled?:boolean
    listContainerStyle: ViewStyle,
    visible: boolean,
    selectedObjects: Array<object>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedObjects: React.Dispatch<React.SetStateAction<Array<object>>>,
    displayedRowItemValue: (item: object) => string,
    onSelect: (item: object) => void,
    rowStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>,

}
