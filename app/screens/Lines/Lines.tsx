import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dropdown from '../../components/Dropdown';
import Layout from '../../components/Layout';
import MultipleSelect from '../../components/MultipleSelect';
import Text from '../../components/Text';
import { GeneralDataContext } from '../../contexts/generalData';
import { LoaderContext } from '../../contexts/loader';
import { MainStackParamList } from '../../navigation';
import LineServices from '../../services/lineService';
import { Line, MatchedRoute, Modes } from '../../types';
import { style } from './style';

const renderItem = (
  { item }:
    {
      item: {
        id: string,
        navigation: StackNavigationProp<MainStackParamList, 'Lines'>,
        mode: string,
        serviceType: string,
        name: string,
        routeSections: MatchedRoute
      }
    },
) => (
  <TouchableOpacity onPress={() => item.navigation.navigate('LineDetail', { id: item.id, name: item.name, serviceType: item.serviceType })} style={style.renderItemContainer}>
    <Text style={style.renderItemNameText}>{item.name}</Text>
    <Text style={style.modeText}>{item.mode}</Text>
  </TouchableOpacity>
);

type Props = StackScreenProps<MainStackParamList, 'Lines'>

export default function Lines({ navigation }: Props) {
  const { modes, serviceTypes } = useContext(GeneralDataContext);
  const [mode, setMode] = useState<string[]>(['bus']);
  const { setLoader } = useContext(LoaderContext);
  const [serviceType, setServiceType] = useState<string>('regular');
  const [lineData, setLineData] = useState<{
    id: string,
    mode: string,
    navigation: StackNavigationProp<MainStackParamList, 'Lines'>,
    serviceType: string,
    name: string,
    routeSections: MatchedRoute
  }[]>([]);
  const handleLineData = (data: Array<Line>) => {
    const editedData = data.map(item => ({
      id: item.id,
      name: item.name,
      serviceType,
      mode: ((item.modeName).replace(/-/g, ' ')),
      routeSections: item.routeSections,
      navigation,
    }));
    setLineData(editedData);
  };

  useEffect(() => {
    setLoader(true);
    LineServices.GetLinesByMode({ modes: mode, serviceTypes: serviceType }).then(handleLineData).then(() => setLoader(false));
  }, [mode, serviceType]);

  return (
    <Layout backgroundColor="white" statusBarColor="white" style={{ paddingHorizontal: 20, paddingTop: 20 }}>
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
          containerStyle={style.multipleSelectContainer}
          onSelect={x => setMode(x.map((item: Modes) => item.modeName))}
          buttonStyle={style.multipleSelectButtonStyle}
          displayedRowItemValue={item => ((item.modeName)?.replace(/-/g, ' '))}
          displayedButtonValue={x => x.map((item: Modes) => ((item.modeName)?.replace(/-/g, ''))?.concat(' '))}
          buttonTextStyle={style.multipleSelectButtonTextStyle}
          rowTextStyle={style.multipleSelectRowTextStyle}
          rowStyle={style.multipleSelectRowStyle}
          buttonTitle="Select Modes"
          listContainerStyle={style.multipleSelectLineContainer}
        />
        <Dropdown
          data={serviceTypes}
          defaultValue="regular"
          containerStyle={style.dropdownContainer}
          onSelect={x => setServiceType(x)}
          buttonStyle={style.dropdownButtonStyle}
          displayedRowItemValue={item => item}
          displayedButtonValue={item => item}
          buttonTextStyle={style.dropwdownButtonTextStyle}
          rowTextStyle={style.dropdownRowTextStyle}
          rowStyle={style.dropdowRow}
          buttonTitle="Select Type"
          listContainerStyle={style.dropdownListContainer}
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
