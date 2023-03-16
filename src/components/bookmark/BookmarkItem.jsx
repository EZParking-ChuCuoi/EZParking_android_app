import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AVATAR} from '../../utils/defaultImage';
import {bgSecondaryDefault, COLORS} from '../../assets/styles/styles';
import EZText from '../core/EZText';
import {EZButtonText} from '../core/EZButton';

const BookmarkItem = ({data}) => {
  const {BG2ND} = bgSecondaryDefault();
  const handleBookNow = () => {
    console.log('book now');
  };
  return (
    <View style={styles.bookmarkItem}>
      <View style={styles.left}>
        {data.count > 0 ? (
          <>
            <EZText color={COLORS.secondary} bold>
              Booked
            </EZText>
            <EZText color={COLORS.secondary} size="quiteLarge" bold>
              {data.count}
            </EZText>
            <EZText color={COLORS.secondary} bold>
              times before
            </EZText>
          </>
        ) : (
          <EZButtonText
            text="Book now"
            handlePress={handleBookNow}
            color={COLORS.secondary}
            styleEZButtonText={{
              backgroundColor: BG2ND,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          />
        )}
      </View>
      <View style={styles.middle}>
        <EZText>{data.nameParkingLot}</EZText>
        <EZText>{data.address}</EZText>
      </View>
      <View style={styles.right}>
        <EZText>Icon here</EZText>
      </View>
    </View>
  );
};

export default BookmarkItem;

const styles = StyleSheet.create({
  bookmarkItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomColor: COLORS.borderBrighter,
    borderBottomWidth: 1,
  },
});
