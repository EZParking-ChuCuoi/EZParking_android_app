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
import {handleCurrenCy} from '../../../shared/handleCurrenCy';

const BookingHistoryItem = ({item}) => {
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const refInfo = useRef();
  const refFeedBack = useRef();
  return (
    <View
      style={[styles.container, {backgroundColor: BG2ND, shadowColor: COLOR}]}>
      <View style={styles.contentLeft}>
        <EZText bold>{item.parking_lot_name}</EZText>
        <EZText>{item.address}</EZText>
        <EZText size="small">
          {item.bookDate} - {item.returnDate}
        </EZText>
        <EZText color={COLORS.secondary}>
          {handleCurrenCy(item.total_payment)}
        </EZText>
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
      <EZRBSheet refRBSheet={refInfo}>
        <BookingHistoryInfo
          bookings={item.booking_ids}
          idSpaceOwner={item.idSpaceOwner}
        />
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
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentRight: {
    width: '16%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10,
  },
});
