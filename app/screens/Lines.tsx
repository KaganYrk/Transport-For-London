import { NavigationContext, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dropdown from '../components/Dropdown';
import Layout from '../components/Layout';
import MultipleSelect from '../components/MultipleSelect';
import Text from '../components/Text';
import { GeneralDataContext } from '../contexts/generalData';
import { MainStackParamList } from '../navigation';
import LineServices from '../services/lineService';
import { Line, MatchedRoute, Modes } from '../types';

const style = StyleSheet.create({
  renderItemContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 3,
    backgroundColor: '#2d3039',
    marginBottom: 5,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  renderItemNameText: { fontSize: 30, flex: 1, color: '#FFFFFF' },
  icon: { marginLeft: 20, alignSelf: 'flex-start' },
  modeText: { color: '#FFFFFF', fontSize: 12, alignSelf: 'flex-start', textTransform: 'capitalize', marginLeft: 20 },
});

const renderItem = (
  { item }:
  { item: { id: string,
    navigation:StackNavigationProp<MainStackParamList, 'Lines'>,
    mode: string,
    name: string,
    routeSections: MatchedRoute }},
) => (
  <TouchableOpacity onPress={() => item.navigation.navigate('LineDetail')} style={style.renderItemContainer}>
    <Text style={style.renderItemNameText}>{item.name}</Text>
    {Icon.hasIcon(item.mode) ? <Icon name={item.mode} style={style.icon} size={20} color="#FFFFFF" /> : <Text style={style.modeText}>{item.mode}</Text>}
  </TouchableOpacity>
);

type Props = StackScreenProps<MainStackParamList, 'Lines'>

export default function Lines({ navigation }:Props) {
  const { modes, serviceTypes } = useContext(GeneralDataContext);
  const [mode, setMode] = useState<string[]>(['bus']);
  const [serviceType, setServiceType] = useState<string>('regular');
  const [lineData, setLineData] = useState<{ id: string, mode: string, name: string, routeSections: MatchedRoute }[]>([]);
  const handleLineData = (data: Array<Line>) => {
    const editedData = data.map(item => ({
      id: item.id,
      name: item.name,
      mode: ((item.modeName).replace(/-/g, ' ')),
      routeSections: item.routeSections,
      navigation,
    }));
    setLineData(editedData);
  };

  useEffect(() => {
    LineServices.GetLinesByMode({ modes: mode, serviceTypes: serviceType }).then(handleLineData);
  }, [mode, serviceType]);

  return (
    <Layout backgroundColor="#FFFFFF" statusBarColor="#0319a8" style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', zIndex: 3 }}>
        <MultipleSelect
          data={modes}
          defaultValue={[{
            isTflService: true,
            isFarePaying: true,
            isScheduledService: true,
            index: 0,
            modeName: 'bus',
          }]}
          scrollEnabled
          containerStyle={{ flex: 1, marginRight: 10 }}
          onSelect={x => setMode(x.map((item: Modes) => item.modeName))}
          buttonStyle={{ backgroundColor: '#2d3039' }}
          displayedRowItemValue={item => ((item.modeName)?.replace(/-/g, ' '))}
          displayedButtonValue={x => x.map((item: Modes) => ((item.modeName)?.replace(/-/g, ''))?.concat(' '))}
          buttonTextStyle={{ textAlign: 'center', color: '#FFFFFF', textTransform: 'capitalize' }}
          rowTextStyle={{ marginLeft: 10, color: '#FFFFFF', textTransform: 'capitalize' }}
          rowStyle={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'white' }}
          buttonTitle="Select Modes"
          listContainerStyle={{ backgroundColor: '#2d3039', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
        />
        <Dropdown
          data={serviceTypes}
          defaultValue="regular"
          containerStyle={{ flex: 0.5 }}
          onSelect={x => setServiceType(x)}
          buttonStyle={{ backgroundColor: '#2d3039' }}
          displayedRowItemValue={item => item}
          displayedButtonValue={item => item}
          buttonTextStyle={{ textAlign: 'center', color: '#FFFFFF', textTransform: 'capitalize' }}
          rowTextStyle={{ marginLeft: 10, color: '#FFFFFF', textTransform: 'capitalize' }}
          rowStyle={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'white' }}
          buttonTitle="Select Type"
          listContainerStyle={{ backgroundColor: '#2d3039', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
        />
      </View>
      <FlatList
        removeClippedSubviews
        initialNumToRender={24}
        maxToRenderPerBatch={12}
        windowSize={12}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        style={{ zIndex: 2, marginTop: 20 }}
        data={lineData}
        renderItem={renderItem}
      />
    </Layout>
  );
}
