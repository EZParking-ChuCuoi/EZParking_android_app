import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colorDefault, COLORS, FONTSIZE} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import EZContainer from './EZContainer';

const EZRBSheetModal = props => {
  const {refRBSheet, height = 500, closeBtn = false} = props;
  const {COLOR} = colorDefault();
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
          borderRadius: 15,
          width: Dimensions.get('screen').width - 20,
          position: 'absolute',
          shadowColor: COLOR,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
          ...props.styleEZRBSheetModal,
        },
        draggableIcon: {
          backgroundColor: COLORS.secondary,
        },
        wrapper: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      {closeBtn && (
        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
          <Icon
            name="chevron-down"
            size={FONTSIZE.iconLarge}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
      )}
      <EZContainer
        styleEZContainer={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {props.children}
      </EZContainer>
    </RBSheet>
  );
};

export default EZRBSheetModal;
