import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import { useUnhideTabBar } from '../../hooks/useHideTabBar';

const BookingTicket = () => {
  useUnhideTabBar();
  return (
    <EZContainer>
      <EZText>BookingTicket</EZText>
    </EZContainer>
  );
};

export default BookingTicket;

const styles = StyleSheet.create({});
