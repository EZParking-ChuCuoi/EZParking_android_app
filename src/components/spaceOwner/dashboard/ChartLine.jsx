import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {COLORS} from '../../../assets/styles/styles';
import EZText from '../../core/EZText';
import {
  handleCurrenCy,
  handleCurrenCyWithout,
} from '../../../shared/handleCurrenCy';

const ChartLine = ({source}) => {
  const data = {
    labels: source.periodLabels,
    datasets: [
      // {
      //   data: source.bookingCounts,
      //   color: (opacity = 1) => `rgba(134, 69, 244, ${opacity})`,
      //   strokeWidth: 1,
      // },
      // {
      //   data: source.uniqueUsers,
      //   color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      //   strokeWidth: 2,
      // },
      {
        data: source.salesTotals,
        color: (opacity = 1) => COLORS.secondary,
        strokeWidth: 5,
      },
    ],
    legend: ['Total amount'],
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={{x: 30000, y: 0}}>
      <LineChart
        data={data}
        width={1000}
        verticalLabelRotation={30}
        horizontalLabelRotation={50}
        renderDotContent={({x, y, indexData, index}) => (
          <View
            style={{
              position: 'absolute',
              top: y + 50,
              left: x - 15,
            }}
            key={index}>
            <EZText size="small">{handleCurrenCy(indexData)}</EZText>
          </View>
        )}
        // withHorizontalLines={false}
        withVerticalLines={false}
        // withHorizontalLabels={false}
        // withInnerLines={false}
        // withOuterLines={false}
        height={500}
        yAxisLabel="(VND) "
        chartConfig={{
          backgroundColor: COLORS.tertiary,
          backgroundGradientFrom: COLORS.primary,
          backgroundGradientTo: COLORS.strokeColor,
          decimalPlaces: 0,
          color: (opacity = 1) => COLORS.yellow,
          labelColor: (opacity = 1) => COLORS.yellow,
          style: {
            borderRadius: 16,
            marginHorizontal: 10,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '0',
            stroke: '#fff',
            fill: COLORS.secondary,

          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

export default ChartLine;

const styles = StyleSheet.create({});
