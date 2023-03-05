import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import EZSliderItem from './EZSliderItem';
import EZSliderPagination from './EZSliderPagination';

const EZSlider = ({data, local=false}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleScroll = e => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {useNativeDriver: false},
    )(e);
  };
  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;
  const handleviewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => <EZSliderItem item={item} local={local} />}
        pagingEnabled
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={handleviewabilityConfig}
      />
      <EZSliderPagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export default EZSlider;

const styles = StyleSheet.create({});
