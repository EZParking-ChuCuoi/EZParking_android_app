import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
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
  const getHistory = async () => {
    const uid = await getData('EZUid');
    mutationBookingHistory.mutate(uid);
  };
  useEffect(() => {
    getHistory();
  }, []);
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
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                getHistory();
              }}
            />
          }
        />
      )}
    </EZContainer>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 6,
  },
});
