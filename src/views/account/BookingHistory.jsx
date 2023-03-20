import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import {useGetBookingHistory} from '../../hooks/api/getBookingParkingLot';
import {getData} from '../../shared/asyncStorages';
import EZLoading from '../../components/core/EZLoading';
import BookingHistoryItem from '../../components/account/bookingHistory/BookingHistoryItem';
import {COLORS, SPACING} from '../../assets/styles/styles';
import Lottie from 'lottie-react-native';

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
          ListEmptyComponent={
            mutationBookingHistory.data?.data?.length === 0 && (
              <View style={styles.empty}>
                <EZText bold size="quiteLarge" color={COLORS.secondary}>
                  Your booking history is empty!
                </EZText>
                <Lottie
                  source={require('../../assets/images/95434-history.json')}
                  autoPlay
                  loop
                  style={[styles.image]}
                />
              </View>
            )
          }
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
  empty: {
    width: '100%',
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    position: 'relative',
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
