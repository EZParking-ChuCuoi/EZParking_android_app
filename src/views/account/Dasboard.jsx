import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import EZBgTopRounded from '../../components/core/EZBgTopRounded';
import {COLORS} from '../../assets/styles/styles';
import AnimatedLoader from 'react-native-animated-loader';
import {EZButtonBack} from '../../components/core/EZButton';
import AnimatedLoading from '../../components/spaceOwner/dashboard/AnimatedLoading';

const Dasboard = () => {
  useHideTabBar();
  return (
    <EZContainer bgEZStatusBar={COLORS.tertiary}>
      <EZButtonBack />
      <AnimatedLoading />
      <EZBgTopRounded>
        <EZText>Dasboard</EZText>
      </EZBgTopRounded>
    </EZContainer>
  );
};

export default Dasboard;

const styles = StyleSheet.create({});
