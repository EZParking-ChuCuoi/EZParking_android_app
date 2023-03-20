import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZText from '../../core/EZText';
import Icon from 'react-native-vector-icons/Feather';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../../assets/styles/styles';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import EZRBSheetModal from '../../core/EZRBSheetModal';
import {EZButton} from '../../core/EZButton';
import EZRBSheet from '../../core/EZRBSheet';
import EditParkingLot from './EditParkingLot';
import {useDeleteParkingLot} from '../../../hooks/api/useSpaceOwnerAction';

const DashboardItem = props => {
  const {isCreate, item, onRefresh} = props;
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const navigation = useNavigation();
  const mutationDelete = useDeleteParkingLot();
  const refPopup = useRef();
  const refEdit = useRef();
  const isDarkMode = useColorScheme() === 'dark';
  const [errMessDelete, setErrMessDel] = useState('');
  const handleDelete = idParking => {
    mutationDelete.mutate(idParking);
  };
  useEffect(() => {
    if (mutationDelete.isSuccess) {
      onRefresh();
    } else if (mutationDelete.isError) {
      let message = '';
      if (mutationDelete.error?.response?.status === 409) {
        message = "Can't delete the parking lot that is already in use!";
      }
      setErrMessDel(message);
    }
  }, [mutationDelete.status]);

  return (
    <TouchableOpacity
      style={[
        styles.managetedItem,
        {backgroundColor: BG2ND, shadowColor: COLOR},
      ]}
      onLongPress={() => {
        !isCreate && refPopup.current.open();
      }}
      onPress={() =>
        navigation.navigate(
          isCreate
            ? 'createLot'
            : {
                name: 'lotDetail',
                params: {
                  idParkingLot: item.idParking,
                  nameParkingLot: item.nameParkingLot,
                },
              },
        )
      }>
      <LinearGradient
      
        colors={
          isCreate
            ? COLORS.linearBGPrimary
            : isDarkMode
            ? COLORS.linearBGDark
            : COLORS.linearBGLight
        }
        style={styles.linearGradient}>
        {isCreate && (
          <Icon
            name="plus"
            size={FONTSIZE.iconLarge}
            color={COLORS.primary}
            style={styles.btn}
          />
        )}
        <EZText lines={2} textAlign="center">
          {isCreate ? 'Create new' : item.nameParkingLot}
        </EZText>
      </LinearGradient>
      {!isCreate && (
        <>
          <EZRBSheetModal refRBSheet={refPopup} height="auto">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 50,
                width: '100%',
                paddingHorizontal: SPACING.pxComponent,
              }}>
              <EZButton
                title="Delete"
                iconName="trash-2"
                w="40%"
                type="secondary"
                handlePress={() => handleDelete(item.idParking)}
              />
              <EZButton
                title="Edit"
                iconName="edit-3"
                w="40%"
                handlePress={() => refEdit.current.open()}
              />
            </View>
            {errMessDelete && <EZText color={COLORS.redLight}>{errMessDelete}</EZText>}
          </EZRBSheetModal>
          <EZRBSheet
            refRBSheet={refEdit}
            closeBtn={false}
            height={Dimensions.get('window').height}
            styleEZRBSheet={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}>
            <EditParkingLot
              refresh={onRefresh}
              refEdit={refEdit}
              refPopup={refPopup}
              idParking={item.idParking}
              nameParkingLot={item.nameParkingLot}
            />
          </EZRBSheet>
        </>
      )}
    </TouchableOpacity>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  managetedItem: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
    width: '30%',
    height: 110,
    borderRadius: 10,
    overflow: 'hidden',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 7,
    backgroundColor: COLORS.bgLight,
    borderRadius: 4,
  },
});
