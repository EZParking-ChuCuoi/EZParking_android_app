import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../core/EZContainer';
import {useGetParkingLotComment} from '../../hooks/api/getParkingLots';
import EZText from '../core/EZText';
import ParkingLotCommentItem from './ParkingLotCommentItem';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SPACING} from '../../assets/styles/styles';
import EZLoading from '../core/EZLoading';
import {EZButtonText} from '../core/EZButton';

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

  return (
    <FlatList
      data={mutationParkingLotComment.data}
      renderItem={({item}) => (
        <ParkingLotCommentItem key={item.id} item={item} />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.headerFlatlist}>
          <EZText bold styleEZText={{marginBottom: 15}}>
            {reviews.length} ratings and reviews
          </EZText>
          {!isScreen && <EZButtonText
            color={COLORS.primary}
            text="See more"
            handlePress={() =>
              navigation.navigate('reviews', {
                parkingId: idParkingLot,
              })
            }
          />}
        </View>
      }
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
  headerFlatlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  }
});
