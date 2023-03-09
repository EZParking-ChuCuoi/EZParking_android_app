import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';

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
        color: (opacity = 1) => `rgba(134, 123, 244, ${opacity})`,
        strokeWidth: 5,
      },
    ],
    legend: ['Revenue day'],
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
        // withHorizontalLines={false}
        withVerticalLines={false}
        // withHorizontalLabels={false}
        // withInnerLines={false}
        // withOuterLines={false}
        height={500}
        yAxisLabel="(VND) "
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            marginHorizontal: 10,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '0',
            stroke: '#fff',
            onLongPress: e => console.log(e),
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
