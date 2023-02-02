import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

const EZButton = () => {
  return (
    <View>
      <Text>Button</Text>
    </View>
  )
}

const EZButtonBack = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backBtn}>
      <Icon name="arrow-left" size={30} color={COLORS.whiteText} />
      <Text style={styles.backBtnText}>Back</Text>
    </TouchableOpacity>
  );
}

export {EZButton, EZButtonBack}