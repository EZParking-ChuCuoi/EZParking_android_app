import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {AVATAR} from '../../utils/defaultImage';
import {COLORS} from '../../assets/styles/styles';

const Notification = () => {
  return (
    <EZContainer>
      <View style={styles.noticeItem}>
        <View style={styles.new} />
        <Image source={{uri: AVATAR}} style={styles.avatar} />
        <View style={styles.noticRight}>
          <View style={styles.noticRightTop}>
            <EZText bold color={COLORS.primary}>
              Hoang Tuan Minh
            </EZText>
            <EZText>Has booked your parking lot</EZText>
          </View>
          <EZText>2 minutes ago</EZText>
        </View>
      </View>
      <View style={styles.noticeItem}>
        <View style={styles.new} />
        <Image source={{uri: AVATAR}} style={styles.avatar} />
        <View style={styles.noticRight}>
          <View style={styles.noticRightTop}>
            <EZText bold color={COLORS.primary}>
              Hoang Tuan Minh
            </EZText>
            <EZText>Has booked your parking lot</EZText>
          </View>
          <EZText>2 minutes ago</EZText>
        </View>
      </View>
    </EZContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({
  noticeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomColor: COLORS.borderBrighter,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  new: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: COLORS.redLight,
  },
  noticRightTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 6,
  },
  noticRight: {
    justifyContent: 'space-between',
  },
});
