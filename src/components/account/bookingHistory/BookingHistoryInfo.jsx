import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from '../../core/EZContainer';
import EZText from '../../core/EZText';
import {
  bgSecondaryDefault,
  COLORS,
  SPACING,
} from '../../../assets/styles/styles';

const BookingHistoryInfo = ({bookings}) => {
  const {BG2ND} = bgSecondaryDefault();
  console.log(bookings);
  const renderItem = ({item}) => {
    return (
      <View style={[styles.container, {backgroundColor: BG2ND}]}>
        <View style={styles.left}>
          <EZText>
            Vehicle type:{' '}
            {item.carType === '4-16SLOT' ? '4 -16 seats' : '16 - 34 seats'}
          </EZText>
          <EZText>
            Slot name: {item.nameBlock}/{item.slotName}
          </EZText>
          <View style={styles.licenseGroup}>
            <EZText>License plate: </EZText>
            <View style={styles.license}>
              <EZText>43A-999.99</EZText>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <EZText color={COLORS.primary}>{item.bookDate}</EZText>
          <EZText color={COLORS.secondary}>{item.payment}</EZText>
        </View>
      </View>
    );
  };
  return (
    <EZContainer
      styleEZContainer={{
        paddingHorizontal: SPACING.pxComponent,
        paddingVertical: 20,
      }}>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />
    </EZContainer>
  );
};

export default BookingHistoryInfo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 10,
    marginBottom: 20,
    position: 'relative',
  },
  right: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  licenseGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  license: {
    padding: 10,
    backgroundColor: COLORS.circleOverlay,
    borderRadius: 5,
  },
});
