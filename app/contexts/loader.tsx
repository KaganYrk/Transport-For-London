/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

const LoaderContext = React.createContext({} as ILoaderContext);

const LoaderProvider = React.memo(({ children }:IChildren) => {
  const [loader, setLoader] = useState(false);
  const rotateValue = useSharedValue(0);
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(54, 47, 51, 0.57)',
    },
  });

  const ImageStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotateValue.value}deg` }] }), [loader]);

  useEffect(() => {
    rotateValue.value = withRepeat(withSpring(360), 0, false);
  }, []);

  const contextValue = useMemo(() => ({ setLoader, loader }), [loader]);

  return (
    <LoaderContext.Provider value={contextValue}>
      {loader && (
      <Modal statusBarTranslucent transparent>
        <View style={styles.wrapper}>
          <Animated.Image resizeMode="contain" style={[{ height: 100, width: 100 }, ImageStyle]} source={require('../assets/loader.png')} />
        </View>
      </Modal>
      )}

      {children}
    </LoaderContext.Provider>
  );
});

export { LoaderContext, LoaderProvider };

/* ----------------------------------------- */
/* --------------- INTERFACES -------------- */
/* ----------------------------------------- */

export interface IChildren {
  children: React.ReactNode,
}

export interface ILoaderContext {
  loader: boolean,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
}
