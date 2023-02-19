import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import EZText from '../core/EZText';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import {AVATAR} from '../../utils/defaultImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {handleDate} from '../../shared/handleDate';

const ParkingLotCommentItem = ({item}) => {
  const COLOR = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const LIMITSTAR = 5;
  // todo: get this shit of line away
  // console.log(item);

  return (
    <View style={[styles.container, {backgroundColor: BG2ND}]}>
      <EZText bold>{item.fullName}</EZText>
      <View style={styles.flexRow}>
        <Image source={{uri: AVATAR}} style={styles.avatar} />
        <View style={styles.contentRight}>
          <View style={styles.flexRow}>
            <View style={styles.rating}>
              {[...Array(item.ranting)].map(index => (
                <Icon
                  name="star"
                  size={FONTSIZE.iconMedium}
                  color={COLORS.yellow}
                />
              ))}
              {[...Array(LIMITSTAR - item.ranting)].map(index => (
                <Icon
                  name="star-o"
                  size={FONTSIZE.iconMedium}
                  color={COLOR}
                />
              ))}
            </View>
            <EZText color={COLORS.disable} size="small">{handleDate(item.created_at)}</EZText>
          </View>
          <EZText>{item.content}</EZText>
        </View>
      </View>
    </View>
  );
};

export default ParkingLotCommentItem;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 6,
    marginBottom: 15,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: COLORS.tertiary,
    borderWidth: 2,
  },
  contentRight: {
    width: '80%',
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: SPACING.mbInputItem,
  },
});
