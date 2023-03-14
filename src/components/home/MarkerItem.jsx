import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {Marker} from 'react-native-maps';
import EZText from '../core/EZText';
import {
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import EZRBSheet from '../core/EZRBSheet';
import EZContainer from '../core/EZContainer';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {EZButton} from '../core/EZButton';
import {useNavigation} from '@react-navigation/native';
import {handleDate} from '../../shared/handleDate';
import EZSlider from '../core/EZSlider';

const MarkerItem = ({item}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const {COLOR} = colorDefault();
  const coordinate = {
    latitude: item.address_latitude,
    longitude: item.address_longitude,
  };
  const handleSave = () => {
    console.log('id', item.id);
  };
  return (
    <Marker
      title={item.nameParkingLot}
      description={
        item.openTime.toString().slice(0, 5) +
        ' - ' +
        item.endTime.toString().slice(0, 5)
      }
      coordinate={coordinate}
      onPress={() => {
        refRBSheet.current.open();
      }}>
      <View style={[styles.marker, {shadowColor: COLORS.black}]}>
        <EZRBSheet refRBSheet={refRBSheet}>
          <EZContainer styleEZContainer={{padding: 10}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <EZSlider data={item.images} />
              <View style={styles.lotContent}>
                <EZText>
                  <EZText bold>{item.nameParkingLot} - </EZText>
                  <EZText bold color={COLORS.secondary}>
                    {Math.round(item.distance * 100) / 100} Km
                  </EZText>
                </EZText>
                <View style={styles.flexRow}>
                  <Icon
                    name="map-pin"
                    size={FONTSIZE.iconMedium}
                    color={COLOR}
                  />
                  <EZText>{item.address}</EZText>
                </View>
                <View style={styles.flexRow}>
                  <Icon
                    name="shield"
                    size={FONTSIZE.iconMedium}
                    color={COLOR}
                  />
                  <EZText>Security system</EZText>
                </View>
                <View style={styles.flexRow}>
                  <IconFontAwesome
                    name="money"
                    size={FONTSIZE.iconMedium}
                    color={COLOR}
                  />
                  <EZText>16 000vnd</EZText>
                </View>
                <EZText bold styleEZText={{marginTop: 10}}>
                  Description
                </EZText>
                <View style={styles.btns}>
                  <EZButton
                    title="Go to detail"
                    type="primary"
                    w="40%"
                    handlePress={() => {
                      navigation.navigate('spaceDetail', {
                        parkingId: item.id,
                      });
                    }}
                  />
                  <EZButton
                    title="Save"
                    type="secondary"
                    w="40%"
                    handlePress={handleSave}
                    iconFontAwesome="bookmark-o"
                  />
                </View>
              </View>
            </ScrollView>
          </EZContainer>
        </EZRBSheet>

        <Image
          source={require('../../assets/images/markerIcon.png')}
          style={styles.markerP}
        />
        <EZText styleEZText={styles.label} size="small">
          {item.nameParkingLot}
        </EZText>
      </View>
    </Marker>
  );
};

export default MarkerItem;

const styles = StyleSheet.create({
  marker: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  markerP: {
    width: 30,
    height: 41,
    resizeMode: 'cover',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    width: '100%',
  },
  btns: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.borderInput,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
