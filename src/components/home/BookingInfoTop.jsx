import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  SPACING,
} from '../../assets/styles/styles';
import EZText from '../core/EZText';
import {formatTimeApi} from '../../shared/handleDate';
import EZSlider from '../core/EZSlider';
import {openGoogleMapsApp} from '../../shared/map';

const BookingInfoTop = ({info}) => {
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const WIDTH = Dimensions.get('screen').width;
  const handleDirection = () => {
    openGoogleMapsApp(info.address_latitude, info.address_longitude);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width:
            info.images.length == 1 ? WIDTH-SPACING.pxComponent*2 : '100%',
          overflow: 'visible'
        }}>
        <EZSlider data={info.images} />
      </View>
      <View style={[styles.plInfo]}>
        <View
          style={[
            styles.plInfoItem,
            {backgroundColor: BG2ND, shadowColor: COLOR},
          ]}>
          <EZText bold>Availables</EZText>
          <EZText color={COLORS.primary} size="small">
            20/50
          </EZText>
        </View>
        <View
          style={[
            styles.plInfoItem,
            {backgroundColor: BG2ND, shadowColor: COLOR},
          ]}>
          <EZText bold>Open time</EZText>
          <EZText color={COLORS.primary} size="small">
            {formatTimeApi(info.openTime)} - {formatTimeApi(info.endTime)}
          </EZText>
        </View>
        <TouchableOpacity
          style={[
            styles.plInfoItem,
            {backgroundColor: BG2ND, shadowColor: COLOR},
          ]}
          onPress={handleDirection}>
          <EZText bold>Direction</EZText>
          <EZText color={COLORS.primary} size="small">
            Open map
          </EZText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingInfoTop;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  plInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.secondary,
    marginTop: 10,
    borderRadius: 4,
  },
  plInfoItem: {
    width: '32.5%',
    alignItems: 'center',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
