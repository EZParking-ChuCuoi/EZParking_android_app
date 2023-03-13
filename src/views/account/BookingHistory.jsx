import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import {useGetBookingHistory} from '../../hooks/api/getBookingParkingLot';
import {getData} from '../../shared/asyncStorages';
import EZLoading from '../../components/core/EZLoading';
import BookingHistoryItem from '../../components/account/bookingHistory/BookingHistoryItem';
import {SPACING} from '../../assets/styles/styles';

const BookingHistory = () => {
  useHideTabBar();
  const mutationBookingHistory = useGetBookingHistory();

  useEffect(() => {
    const mutating = async () => {
      const uid = await getData('EZUid');
      mutationBookingHistory.mutate(uid);
    };
    mutating();
  }, []);
  console.log(mutationBookingHistory?.data?.data[0]?.booking_ids)
  return (
    <EZContainer>
      {mutationBookingHistory.isLoading && <EZLoading />}
      {mutationBookingHistory.isSuccess && (
        <FlatList
          data={mutationBookingHistory.data?.data}
          renderItem={({item}) => <BookingHistoryItem item={item} />}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.container}
          initialNumToRender={5}
        />
      )}
    </EZContainer>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SPACING.pxComponent,
  },
});
