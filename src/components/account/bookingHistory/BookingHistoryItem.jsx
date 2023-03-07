import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import EZText from '../../core/EZText';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
} from '../../../assets/styles/styles';
import {EZButtonIcon} from '../../core/EZButton';
import EZRBSheet from '../../core/EZRBSheet';
import BookingHistoryInfo from './BookingHistoryInfo';
import BookingHistoryFeedback from './BookingHistoryFeedback';

const BookingHistoryItem = ({item}) => {
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const refInfo = useRef();
  const refFeedBack = useRef();
  return (
    <View
      style={[styles.container, {backgroundColor: BG2ND, shadowColor: COLOR}]}>
      <View style={styles.contentLeft}>
        <EZText bold color={COLORS.primary}>
          Name parking lot
        </EZText>
        <EZText size="small">20:00 8/3/2022 - 20:00 8/3/2022</EZText>
        <EZText color={COLORS.secondary}>16000</EZText>
      </View>
      <View style={styles.contentRight}>
        <EZButtonIcon
          iconName="info"
          color={COLORS.primary}
          handlePress={() => refInfo.current.open()}
        />
        <EZButtonIcon
          iconName="smile"
          color={COLORS.secondary}
          handlePress={() => refFeedBack.current.open()}
        />
      </View>
      <EZRBSheet
        refRBSheet={refInfo}>
        <BookingHistoryInfo bookings={item.bookings} />
      </EZRBSheet>
      <EZRBSheet
        refRBSheet={refFeedBack}
        height={Dimensions.get('screen').height - 200}>
        <BookingHistoryFeedback />
      </EZRBSheet>
    </View>
  );
};

export default BookingHistoryItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: 15,
  },
  contentLeft: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentRight: {
    width: '28%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10,
  },
});
