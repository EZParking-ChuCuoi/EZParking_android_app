import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import EZText from '../../core/EZText';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
} from '../../../assets/styles/styles';
import {EZButtonIcon, EZButton} from '../../core/EZButton';
import EZRBSheet from '../../core/EZRBSheet';
import BookingHistoryInfo from './BookingHistoryInfo';
import BookingHistoryFeedback from './BookingHistoryFeedback';
import {handleCurrenCy} from '../../../shared/handleCurrenCy';
import {formatRelativeTime} from '../../../shared/handleDate';
import {Link} from '@react-navigation/native';
import EZRBSheetModal from '../../core/EZRBSheetModal';
import {
  useCancelHistory,
  useGetBookingHistory,
} from '../../../hooks/api/getBookingParkingLot';
import useRQGlobalState from '../../../hooks/useRQGlobal';
import EZLoading from '../../core/EZLoading';

const BookingHistoryItem = ({item}) => {
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const refInfo = useRef();
  const mutationCalcel = useCancelHistory();
  const [histories, setHistories] = useRQGlobalState('history', []);
  const [userInfo] = useRQGlobalState('user', {});
  const mutationBookingHistory = useGetBookingHistory();
  const refFeedBack = useRef();
  const refCancel = useRef();
  let bgStatus;
  if (item.statusBooking === 'Pending') {
    bgStatus = COLORS.strokeColor;
  } else if (item.statusBooking === 'Completed') {
    bgStatus = COLORS.secondary;
  } else if (item.statusBooking === 'parked') {
    bgStatus = COLORS.yellowDarker;
  } else if (item.statusBooking === 'Cancelled') {
    bgStatus = COLORS.redLight;
  }
  const handleCancel = () => {
    mutationCalcel.mutate(item.booking_ids);
    refCancel.current.close();
  };
  useEffect(() => {
    if (mutationCalcel.isSuccess) {
      mutationBookingHistory.mutate(userInfo.id);
    }
  }, [mutationCalcel.status]);
  useEffect(() => {
    if (mutationBookingHistory.isSuccess) {
      setHistories(mutationBookingHistory.data?.data);
    }
  }, [mutationBookingHistory.status]);
  return (
    <View
      style={[styles.container, {backgroundColor: BG2ND, shadowColor: COLOR}]}>
      {mutationCalcel.isLoading && <EZLoading />}
      <View style={styles.contentLeft}>
        <View style={[styles.badge, {backgroundColor: bgStatus}]}>
          <EZText>{item.statusBooking}</EZText>
        </View>
        <Link
          to={{
            screen: 'spaceDetail',
            params: {parkingId: item.idParking},
          }}>
          <EZText bold size=">medium">
            {item.parking_lot_name}
          </EZText>
        </Link>
        <EZText>{item.address}</EZText>
        <EZText>
          <EZText size="small" color={COLORS.disable}>
            Booked {formatRelativeTime(item.created_at)}
          </EZText>
          <EZText size="small" color={COLORS.disable}>
            {item.statusBooking !== 'Cancelled'
              ? new Date(item.returnDate) < new Date()
                ? ` | Finished ${formatRelativeTime(item.returnDate)}`
                : ` | Start ${formatRelativeTime(item.bookDate)}`
              : null}
          </EZText>
        </EZText>
        <EZText color={COLORS.secondary} bold>
          {handleCurrenCy(item.total_payment)}
        </EZText>
      </View>
      <View style={styles.contentRight}>
        <EZButtonIcon
          iconName="info"
          color={COLORS.primary}
          handlePress={() => refInfo.current.open()}
        />
        {item.statusBooking === 'Completed' && (
          <EZButtonIcon
            iconName="smile"
            color={COLORS.secondary}
            handlePress={() => refFeedBack.current.open()}
          />
        )}
        {item.statusBooking === 'Pending' && (
          <EZButtonIcon
            iconName="x-circle"
            color={COLORS.redLight}
            handlePress={() => refCancel.current.open()}
          />
        )}
      </View>
      <EZRBSheet refRBSheet={refInfo}>
        <BookingHistoryInfo
          bookings={item.booking_ids}
          idSpaceOwner={item.idSpaceOwner}
          returnDate={item.returnDate}
        />
      </EZRBSheet>
      <EZRBSheet refRBSheet={refFeedBack}>
        <BookingHistoryFeedback idParking={item.idParking} />
      </EZRBSheet>
      <EZRBSheetModal height="auto" refRBSheet={refCancel}>
        <EZText bold size="quiteLarge" color={COLORS.redLight}>
          Warning!
        </EZText>
        <EZText styleEZText={{marginVertical: 15}}>
          Cancel this booking <EZText bold>{item.parking_lot_name}</EZText> ?
        </EZText>
        <EZButton title="Cancel now" w="50%" handlePress={handleCancel} />
      </EZRBSheetModal>
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
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10,
  },
  badge: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
