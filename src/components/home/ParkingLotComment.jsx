import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../core/EZContainer';
import {useGetParkingLotComment} from '../../hooks/api/getParkingLots';
import EZText from '../core/EZText';
import ParkingLotCommentItem from './ParkingLotCommentItem';
import {useNavigation} from '@react-navigation/native';
import {SPACING} from '../../assets/styles/styles';
import EZLoading from '../core/EZLoading';

const ParkingLotComment = props => {
  const {idParkingLot, isScreen = false} = props;
  const navigation = useNavigation();
  const mutationParkingLotComment = useGetParkingLotComment();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    mutationParkingLotComment.mutate(idParkingLot);
  }, []);
  useEffect(() => {
    if (mutationParkingLotComment.isSuccess) {
      setReviews(mutationParkingLotComment.data);
    }
  }, [mutationParkingLotComment.status]);

  const handleScroll = () => {
    if (!isScreen) {
      navigation.navigate('reviews', {
        parkingId: idParkingLot,
      });
    }
  };
  return (
    <FlatList
      data={mutationParkingLotComment.data}
      renderItem={({item}) => (
        <ParkingLotCommentItem item={item} />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <EZText bold styleEZText={{marginBottom: 15}}>
          {reviews.length} ratings and reviews
        </EZText>
      }
      onScrollEndDrag={handleScroll}
      ListEmptyComponent={
        mutationParkingLotComment.isLoading ? (
          <EZLoading />
        ) : (
          <EZText>This parking lot has no reviews yet</EZText>
        )
      }
      initialNumToRender={5}
      contentContainerStyle={{
        paddingHorizontal: isScreen ? SPACING.pxComponent : 0,
        flexGrow: 1,
      }}
    />
  );
};

export default ParkingLotComment;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
