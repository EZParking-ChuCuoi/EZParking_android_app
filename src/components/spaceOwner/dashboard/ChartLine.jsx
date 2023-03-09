import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';

const ChartLine = ({source}) => {
  console.log('source', source);
  const data = {
    labels: source.periodLabels,
    datasets: [
      {
        data: source.bookingCounts,
        color: (opacity = 1) => `rgba(134, 255, 244, ${opacity})`,
        strokeWidth: 1,
      },
      {
        data: source.uniqueUsers,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Revenue day', 'cc'],
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <LineChart
      data={data}
      width={2000}
      verticalLabelRotation={30}
      height={500}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
          marginHorizontal: 10,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
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
