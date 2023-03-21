import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import {COLORS, EZStatusBar, SPACING} from '../../assets/styles/styles';
import EZInput from '../../components/core/EZInput';
import {AVATAR} from '../../utils/defaultImage';
import {useGetSavedParkingLot} from '../../hooks/api/getParkingLots';
import {getData} from '../../shared/asyncStorages';
import EZLoading from '../../components/core/EZLoading';
import BookmarkItem from '../../components/bookmark/BookmarkItem';
import Lottie from 'lottie-react-native';

const Bookmark = () => {
  const mutationGetSavedParkingLot = useGetSavedParkingLot();
  const initalMutate = async () => {
    const uid = await getData('EZUid');
    mutationGetSavedParkingLot.mutate(uid);
  };

  useEffect(() => {
    initalMutate();
  }, []);
  return (
    <EZContainer>
      {mutationGetSavedParkingLot.isLoading && <EZLoading />}
      <FlatList
        data={mutationGetSavedParkingLot?.data || []}
        keyExtractor={item => item.parkingLotId}
        renderItem={({item}) => (
          <BookmarkItem data={item} onRefresh={initalMutate} />
        )}
        ListEmptyComponent={
          mutationGetSavedParkingLot?.data?.length===0 && (
            <View style={styles.empty}>
              <EZText bold size="quiteLarge" color={COLORS.secondary}>
                Save your favorite parking!
              </EZText>
              <Lottie
                source={require('../../assets/images/bookmark.json')}
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
              initalMutate();
            }}
          />
        }
      />
    </EZContainer>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
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
