/* eslint-disable react/jsx-one-expression-per-line */
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Layout from '../../components/Layout';
import { MainStackParamList } from '../../navigation';
import LineServices from '../../services/lineService';
import { Tfl21, Tfl23 } from '../../types';
import Button from '../../components/Button';
import { style } from './style';
import { LoaderContext } from '../../contexts/loader';

type navigationProp = StackNavigationProp<MainStackParamList, 'LineDetail'>

const RenderItem = (
  { index,
    item,
    length,
    lineId,
    navigation }: {
      lineId: string,
      navigation: navigationProp,
      index: number,
      item: { id?: string, name?: string, stopLetter?: string },
      length?: number,
    },
) => (
  <View style={style.renderItemContainer}>
    <View style={style.renderItemLeft}>
      <Text style={style.renderItemLeftIcon}>
        {item.stopLetter ?? <AntDesign name="swap" size={18} color="white" />}
      </Text>
      {index !== 0 && length !== index + 1 && <View style={style.renderItemLeftStrip} />}
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('StopDetail', { stopId: item.id!, lineId })} style={style.renderItemTouchable}>
      <Text style={style.renderItemTouchableText}>{item.name}</Text>
      <AntDesign name="right" size={24} style={style.renderItemRightIcon} color="black" />
    </TouchableOpacity>
  </View>
);

type Props = StackScreenProps<MainStackParamList, 'LineDetail'>
export default function LineDetail({ navigation, route }: Props) {
  const { id, serviceType, name } = route.params;
  const { setLoader } = useContext(LoaderContext);
  const insets = useSafeAreaInsets();
  const [direction, setDirection] = useState<1 | 0>(0);
  const [lineData, setLineData] = useState<Tfl21[]>();
  const directionStops = lineData?.[direction].stopPoint?.map(y => ({ id: y.id, name: y.name, stopLetter: y.stopLetter }));
  const handleRouteStopsData = (data: Tfl23) => {
    const editedData = data.stopPointSequences;
    setLineData(editedData);
  };

  useEffect(() => {
    setLoader(true);
    LineServices.GetRouteStops({ id, serviceType }).then(handleRouteStopsData).then(() => setLoader(false));
  }, [id, serviceType]);

  return (
    <Layout headerless backgroundColor="#FFFFFFF" statusBarColor="white" style={style.layout}>
      <Button onPress={() => setDirection(prev => (prev === 1 ? 0 : 1))} buttonInContainerStyle={style.directionButtonInContainer} containerStyle={[{ bottom: insets.bottom + 20 }, style.directionButtonContainer]} style={style.directionButtonStyle}>
        <MaterialCommunityIcons size={20} name="swap-horizontal-variant" color="white" />
      </Button>
      <View style={style.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} style={style.backIcon} color="#cc3333" />
        </TouchableOpacity>
        <Text style={style.nameText}>
          {name}
        </Text>
        <View style={style.descriptionContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={style.descriptionText}>From: {directionStops?.[0].name}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={style.descriptionText}>To: {directionStops?.[directionStops.length - 1]?.name}</Text>
        </View>
      </View>
      <FlatList
        data={directionStops}
        renderItem={({ item, index }) => <RenderItem navigation={navigation} lineId={id} index={index} item={item} length={directionStops?.length} />}
        keyExtractor={item => item.id!}
        removeClippedSubviews
        initialNumToRender={24}
        maxToRenderPerBatch={12}
        windowSize={12}
        showsVerticalScrollIndicator={false}
        scrollEnabled
      />

    </Layout>
  );
}
