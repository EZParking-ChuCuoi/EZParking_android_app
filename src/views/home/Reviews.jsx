import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from '../../components/core/EZContainer';
import ParkingLotComment from '../../components/home/ParkingLotComment';

const Reviews = ({naigation, route}) => {
  const {parkingId} = route.params;
  return (
    <EZContainer>
      <ParkingLotComment idParkingLot={parkingId} isScreen />
    </EZContainer>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
