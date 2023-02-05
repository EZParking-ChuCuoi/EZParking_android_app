import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EZContainer from '../components/core/EZContainer'
import EZText from '../components/core/EZText'
import { EZButton, EZButtonBack } from '../components/core/EZButton'
import { EZStatusBar } from '../assets/styles/styles'

const Chat = () => {
  return (
    <EZContainer >
      <EZButtonBack/>
      <EZText size="large" bold>Chat</EZText>
      <EZStatusBar/>
    </EZContainer>
  )
}

export default Chat

const styles = StyleSheet.create({})