import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';

const ChartBar = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [1, 2, 3, 4, 7, 9, 11],
        color: (opacity = 1) => `rgba(134, 255, 244, ${opacity})`,
      },
      {
        data: [1, 2, 3, 4, 7, 9, 11],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };
  return (
    <BarChart
      data={data}
      width={Dimensions.get('screen').width - 20}
      yAxisLabel=""
      yAxisSuffix=""
      yAxisInterval={9}
      height={400}
      chartConfig={{
        backgroundColor: '#fff',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#aaa',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        paddingHorizontal: 10,
      }}
    />
  );
};

export default ChartBar;

const styles = StyleSheet.create({});
