import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, FONTSIZE} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';

const EZRBSheet = props => {
  const {refRBSheet, height = 500} = props;
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      animationType="slide"
      minClosingHeight={4}
      customStyles={{
        container: {
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: height,
          borderTopLeftRadius: 23,
          borderTopRightRadius: 23,
          backgroundColor: COLORS.primary,
        
        },
        draggableIcon: {
          backgroundColor: COLORS.secondary,
        },
      }}>
      <TouchableOpacity onPress={()=>refRBSheet.current.close()}>
        <Icon name="chevron-down" size={FONTSIZE.iconLarge} color={COLORS.secondary} />
      </TouchableOpacity>
      {props.children}
    </RBSheet>
  );
};

export default EZRBSheet;
