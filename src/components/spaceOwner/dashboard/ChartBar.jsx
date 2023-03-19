import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {handleCurrenCy} from '../../../shared/handleCurrenCy';
import {COLORS, FONTSIZE, SPACING} from '../../../assets/styles/styles';
import moment from 'moment';
import EZText from '../../core/EZText';
import {LocalNotification} from '../../../shared/LocalPushController';

const ChartBar = ({source}) => {
  const WIDTH = Dimensions.get('screen').width;
  const data = {
    labels: source.map(item => {
      return item.nameParkingLot;
    }),
    datasets: [
      {
        data: source.map(item => {
          return item.totalRevenue;
        }),
        colors: source.map(() => {
          return (opacity = 1) => COLORS.secondary;
        }),
      },
    ],
    legend: [],
  };
  const widthChart =
    data.labels.length > 5
      ? data.labels.length * (WIDTH / 5)
      : WIDTH - SPACING.pxComponent * 2;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={{x: 10, y: 0}}>
      <BarChart
        data={data}
        width={widthChart}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={20}
        verticalLabelRotation={30}
        showsHorizontalScrollIndicator={true}
        withHorizontalLabels={false}
        withInnerLines={false}
        showValuesOnTopOfBars={true}
        showBarTops={false}
        withCustomBarColorFromData={true}
        flatColor={true}
        height={400}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: COLORS.primary,
          backgroundGradientTo: COLORS.strokeColor,
          formatTopBarValue: value => handleCurrenCy(value),
          color: (opacity = 1) => COLORS.white,
          labelColor: () => COLORS.yellow,
          style: {
            borderRadius: 16,
          },
          linejoinType: 'miter',
          barPercentage: 0.7,
          barRadius: 10,
          scrollableDotRadius: 10,
          formatYLabel: ylable => handleCurrenCy(parseInt(ylable)),
        }}
        bezier
        
      />
    </ScrollView>
  );
};

export default ChartBar;

const styles = StyleSheet.create({});
