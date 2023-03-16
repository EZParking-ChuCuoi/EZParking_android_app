import {
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
    <EZContainer styleEZContainer={{padding: SPACING.pxComponent}}>
      {mutationGetSavedParkingLot.isLoading && <EZLoading />}
      <FlatList
        data={mutationGetSavedParkingLot?.data || []}
        keyExtractor={item => item.parking_lot_id}
        renderItem={({item}) => <BookmarkItem data={item} />}
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

const styles = StyleSheet.create({});
