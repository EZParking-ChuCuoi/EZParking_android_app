import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';

const ChartLine = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [10, -4, 6, -8, 80, 20],
        color: (opacity = 1) => `rgba(134, 255, 244, ${opacity})`, // optional
        strokeWidth: 1,
      },
      {
        data: [5, 8, 6, 9, 8, 2, -2],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2,
      },
    ],
    legend: ['Revenue day'], // optional
  };
  return (
    <LineChart
      data={data}
      width={Dimensions.get('screen').width-20}
      
      height={320}
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
  );
};

export default ChartLine;

const styles = StyleSheet.create({});
