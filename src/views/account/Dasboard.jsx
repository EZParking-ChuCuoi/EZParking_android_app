import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import EZBgTopRounded from '../../components/core/EZBgTopRounded';
import { COLORS } from '../../assets/styles/styles';

const Dasboard = () => {
  useHideTabBar();
  return (
    <EZContainer bgEZStatusBar={COLORS.tertiary}>
      <EZBgTopRounded>
        <EZText>Dasboard</EZText>
      </EZBgTopRounded>
    </EZContainer>
  );
};

export default Dasboard;

const styles = StyleSheet.create({});
