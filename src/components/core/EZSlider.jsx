import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import EZSliderItem from './EZSliderItem';
import EZSliderPagination from './EZSliderPagination';
import {SPACING} from '../../assets/styles/styles';

const EZSlider = ({data, local = false}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
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
      {
        useNativeDriver: false,
      },
    )(event);
  };

  // todo: fix load index here
  // const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
  //   setIndex(viewableItems[0].index ?? 0);
  // }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => {
          // setIndex(index);
          return index;
        }}
        renderItem={({item}) => <EZSliderItem item={item} local={local} />}
        pagingEnabled
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        // onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{gap: SPACING.pxComponent}}
      />
      <EZSliderPagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export default EZSlider;

const styles = StyleSheet.create({});
