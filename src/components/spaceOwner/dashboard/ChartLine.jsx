import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {COLORS, SPACING} from '../../../assets/styles/styles';
import EZText from '../../core/EZText';
import {
  handleCurrenCy,
  handleCurrenCyWithout,
} from '../../../shared/handleCurrenCy';

const ChartLine = ({source}) => {
  const WIDTH = Dimensions.get('screen').width;
  const data = {
    labels: source.periodLabels,
    datasets: [
      {
        data: source.salesTotals,
        color: (opacity = 1) => COLORS.secondary,
        strokeWidth: 5,
      },
    ],
    legend: [],
  };

  const widthChart =
    source.periodLabels.length > 5
      ? source.periodLabels.length * (WIDTH / 5)
      : WIDTH - SPACING.pxComponent * 2;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={{x: 30000, y: 0}}>
      <LineChart
        data={data}
        width={widthChart}
        verticalLabelRotation={30}
        withHorizontalLabels={false}
        withInnerLines={false}
        horizontalLabelRotation={50}
        renderDotContent={({x, y, indexData, index}) => (
          <View
            style={{
              position: 'absolute',
              top: y + 30,
              left: x - 15,
            }}
            key={index}>
            <EZText size="small" color={COLORS.white}>
              {handleCurrenCy(indexData)}
            </EZText>
          </View>
        )}
        withVerticalLines={false}
        height={350}
        chartConfig={{
          backgroundColor: COLORS.tertiary,
          backgroundGradientFrom: COLORS.primary,
          backgroundGradientTo: COLORS.strokeColor,
          decimalPlaces: 0,
          color: (opacity = 1) => COLORS.yellow,
          labelColor: (opacity = 1) => COLORS.yellow,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '0',
            stroke: '#fff',
            fill: COLORS.secondary,
          },
          formatYLabel: ylable => handleCurrenCy(parseInt(ylable)),
        }}
        bezier
      />
    </ScrollView>
  );
};

export default ChartLine;

const styles = StyleSheet.create({});
