import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EZText from '../../components/core/EZText'
import EZContainer from '../../components/core/EZContainer'
import { useHideTabBar } from '../../hooks/useHideTabBar'

const SpaceDetail = () => {
  useHideTabBar();
  return (
    <EZContainer>
      <EZText>SpaceDetail</EZText>
    </EZContainer>
  )
}

export default SpaceDetail

const styles = StyleSheet.create({})