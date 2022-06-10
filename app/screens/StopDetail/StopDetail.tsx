import { BlurView } from 'expo-blur';
import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../components/Layout';
import LineServices from '../../services/lineService';
import { MainStackParamList } from '../../navigation';
import { Tfl34, Tfl39 } from '../../types';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import { style } from './style';

type Props= StackScreenProps<MainStackParamList, 'StopDetail'>

export default function StopDetail({ navigation, route }:Props) {
  const { lineId, stopId } = route.params;
  const [timetableData, setTimetableData] = useState<Tfl34[]>();
  const [TimePeriod, setTimePeriod] = useState();
  const handleRouteStopsData = (data:Tfl39) => {
    const editedData = data.timetable?.routes.map(item => item.schedules).flat();

    setTimetableData(editedData);
  };
  useEffect(() => {
    LineServices.GetStationTimetable({ stopId, lineId }).then(handleRouteStopsData);
  }, []);
  return (
    <Layout statusBarColor="transparent">
      <BlurView intensity={100} tint="dark" style={style.blurContainer}>
        <View style={style.modalContainer}>
          <Text style={style.header}>Timetable</Text>
          <Dropdown
            data={timetableData}
            containerStyle={style.dropdownContainer}
            buttonStyle={style.dropdownButton}
            buttonTextStyle={style.dropdownButtonText}
            listContainerStyle={style.dropdownListContainer}
            rowStyle={style.dropdownRow}
            rowTextStyle={style.dropdownRowText}
            displayedRowItemValue={x => x.name}
            onSelect={x => setTimePeriod(x.name)}
            displayedButtonValue={x => x.name}
            buttonTitle="Select Time Period"
          />

          <ScrollView>
            {timetableData?.find(x => x.name === TimePeriod)?.knownJourneys.map(y => (
              <View key={y.hour + y.minute} style={style.itemContainer}>
                <Text style={style.itemText}>
                  {y.hour}
                  :
                  {y.minute}
                </Text>
              </View>
            ))}
          </ScrollView>
          <Button style={{ backgroundColor: '#cc3333' }} title="Close" containerStyle={{ marginTop: 20 }} textStyle={{ color: '#FFFFFF' }} onPress={() => navigation.goBack()} />
        </View>
      </BlurView>
    </Layout>
  );
}
