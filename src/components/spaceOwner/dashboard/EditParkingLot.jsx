import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../core/EZContainer';
import EZText from '../../core/EZText';
import {EZButton, EZButtonBack, EZButtonText} from '../../core/EZButton';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../../assets/styles/styles';
import EZInput from '../../core/EZInput';
import EZRBSheet from '../../core/EZRBSheet';
import {getData, getDataObj} from '../../../shared/asyncStorages';
import EZMapView from '../../core/EZMapView';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import EZSlider from '../../core/EZSlider';
import Lottie from 'lottie-react-native';
import {
  useCreateParkingLot,
  useEditParkingLot,
} from '../../../hooks/api/useSpaceOwnerAction';
import EZLoading from '../../core/EZLoading';
import {useNavigation, useRoute} from '@react-navigation/native';
import Geocoder from 'react-native-geocoder';
import {useGetParkingLotInfo} from '../../../hooks/api/getParkingLots';
import {androidNotification} from '../../../shared/androidNotification';

const EditParkingLot = ({
  refresh,
  refEdit,
  refPopup,
  idParking,
  nameParkingLot,
}) => {
  const refInput = useRef();
  const refRBSheet = useRef();
  const mutationEdit = useEditParkingLot();
  const mutationGetInfo = useGetParkingLotInfo();
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const navigation = useNavigation();
  const [params, setParams] = useState({
    idParkingLot: idParking,
    name: '',
    address: '',
    lat: '',
    lng: '',
    open: null,
    close: null,
    images: [],
    imagesUpdate: [],
    desc: '',
  });
  const [errMess, setErrMess] = useState({
    name: '',
    address: '',
    coordinate: '',
    open: null,
    close: null,
    imagesUpdate: '',
    desc: '',
  });
  const [showDateTimePicker, setShowDateTimePicker] = useState({
    open: false,
    close: false,
  });
  const [coordinate, setCoordinate] = useState(undefined);
  const [coordinateDrag, setCoordinateDrag] = useState(undefined);
  useEffect(() => {
    const getCoor = async () => {
      const coor = await getDataObj('EZCurrentRegion');
      const uid = await getData('EZUid');
      console.log(uid, idParking, nameParkingLot);
      setCoordinate(coor);
      mutationGetInfo.mutate({
        parkingId: idParking,
        uid: uid,
      });
    };
    getCoor();
  }, []);
  useEffect(() => {
    if (mutationGetInfo.isSuccess) {
      console.log('CCC', mutationGetInfo.data[0]?.openTime.slice(0,5));
      setParams({
        ...params,
        ['name']: mutationGetInfo.data[0]?.nameParkingLot,
        ['address']: mutationGetInfo.data[0]?.address,
        ['lat']: mutationGetInfo.data[0]?.address_latitude,
        ['lng']: mutationGetInfo.data[0]?.address_longitude,
        ['open']: mutationGetInfo.data[0]?.openTime.slice(0,5),
        ['close']: mutationGetInfo.data[0]?.endTime.slice(0,5),
        ['images']: mutationGetInfo.data[0]?.images,
        ['desc']: mutationGetInfo.data[0]?.desc,
      });
    } else {
      console.log(mutationGetInfo.error?.response?.data);
    }
  }, [mutationGetInfo.status]);
  console.log(params);
  useEffect(() => {
    if (mutationEdit.isSuccess) {
      setParams({
        idParkingLot: idParking,
        name: '',
        address: '',
        lat: '',
        lng: '',
        open: null,
        close: null,
        images: [],
        imagesUpdate: [],
        desc: '',
      });
      androidNotification('Updated success!');
      refEdit.current.close();
      refPopup.current.close();
    } else {
      console.log(mutationEdit.error?.response?.data);
    }
  }, [mutationEdit.status]);
  const handleSearch = details => {
    setCoordinate({
      ...coordinate,
      ['latitude']: details?.geometry?.location?.lat,
      ['longitude']: details?.geometry?.location?.lng,
    });
  };
  const handleClose = () => {
    //todo Consider to set address param
    // setParams({
    //   ...params,
    //   ['address']: refInput.current?.getAddressText(),
    // });
    refRBSheet.current.close();
    if (coordinateDrag !== undefined) {
      setParams({
        ...params,
        ['lat']: coordinateDrag.latitude,
        ['lng']: coordinateDrag.longitude,
      });
    } else {
      setParams({
        ...params,
        ['lat']: coordinate.latitude,
        ['lng']: coordinate.longitude,
      });
    }
  };
  const handleGetAddress = coordinate => {
    let lat = coordinate.latitude;
    let lng = coordinate.longitude;
    Geocoder.geocodePosition({lat, lng}).then(res => {
      setParams({
        ...params,
        ['address']: res[0].formattedAddress,
      });
    });
    setCoordinateDrag(coordinate);
  };
  const handlePickImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      cropping: true,
    }).then(img => {
      setParams({...params, ['imagesUpdate']: img});
    });
  };
  const handleValidate = () => {
    let check = true;
    let errorMessage = {
      name: '',
      address: '',
      coordinate: '',
      open: null,
      close: null,
      imagesUpdate: '',
      desc: '',
    };
    if (params.address === '') {
      errorMessage.address = 'Please enter parking lot address!';
      check = false;
    }
    if (params.name === '') {
      errorMessage.name = 'Please enter parking lot name!';
      check = false;
    }
    if (params.desc === '') {
      errorMessage.desc = 'Please enter parking lot desc!';
      check = false;
    }
    if (params.lat === '' || params.lng === '') {
      errorMessage.coordinate = 'Please pick your location in map!';
      check = false;
    }
    if (params.open === null) {
      errorMessage.open = 'Please choose open time!';
      check = false;
    }
    if (params.close === null) {
      errorMessage.close = 'Please choose close time!';
      check = false;
    }
    if (params.close < params.open) {
      errorMessage.close = 'Close time must be after open time!';
      check = false;
    }
    setErrMess(errorMessage);
    return check;
  };
  const handleEdit = () => {
    if (!handleValidate()) {
      return;
    }
    mutationEdit.mutate(params);
  };

  return (
    <EZContainer styleEZContainer={styles.container}>
      {mutationEdit.isLoading && <EZLoading text=" " />}
      {mutationGetInfo.isLoading && <EZLoading text=" " />}
      <View style={styles.title}>
        <TouchableOpacity
          onPress={() => {
            refEdit.current.close();
            refPopup.current.close();
          }}>
          <Icon name="arrow-left" color={COLOR} size={FONTSIZE.iconLarge} />
        </TouchableOpacity>
        <EZText size="quiteLarge" bold>
          Edit {nameParkingLot}{' '}
        </EZText>
      </View>
      <DatePicker
        modal
        open={showDateTimePicker.open}
        date={new Date()}
        mode={'time'}
        onConfirm={date => {
          setParams({
            ...params,
            ['open']: moment(new Date(date)).format('HH:mm'),
          });
          setShowDateTimePicker({
            ...showDateTimePicker,
            ['open']: !showDateTimePicker.open,
          });
        }}
        onCancel={() =>
          setShowDateTimePicker({
            ...showDateTimePicker,
            ['open']: !showDateTimePicker.open,
          })
        }
      />
      <DatePicker
        modal
        open={showDateTimePicker.close}
        date={new Date()}
        mode={'time'}
        onConfirm={date => {
          setParams({
            ...params,
            ['close']: moment(new Date(date)).format('HH:mm'),
          });
          setShowDateTimePicker({
            ...showDateTimePicker,
            ['close']: !showDateTimePicker.close,
          });
        }}
        onCancel={() =>
          setShowDateTimePicker({
            ...showDateTimePicker,
            ['close']: !showDateTimePicker.close,
          })
        }
      />
      <ScrollView
        style={styles.form}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <EZInput
          label="Parking lot name"
          errMess={errMess.name}
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          placeholder="Name"
          maxLength={50}
          defaultValue={params.name}
          onChangeText={name => setParams({...params, ['name']: name})}
        />
        <EZInput
          label="Description"
          errMess={errMess.desc}
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          lines={5}
          placeholder="Description"
          defaultValue={params.desc}
          onChangeText={desc => setParams({...params, ['desc']: desc})}
        />
        <EZInput
          label="Address"
          errMess={errMess.address}
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          placeholder="Address"
          lines={2}
          value={params.address}
          onChangeText={address => setParams({...params, ['address']: address})}
        />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
            refInput.current?.setAddressText(params.address);
          }}
          style={[styles.btnPick, {backgroundColor: BG2ND}]}>
          <IconMaterialIcons
            name="my-location"
            size={FONTSIZE.iconLarge}
            color={
              params.lat !== '' && params.lng !== ''
                ? COLORS.primary
                : COLORS.disable
            }
          />
          <EZText
            color={params.lat !== '' && params.lng !== '' && COLORS.primary}>
            {params.lat !== '' && params.lng !== ''
              ? 'Picked location success'
              : 'Pick specific location'}
          </EZText>
        </TouchableOpacity>
        {errMess.coordinate && (
          <EZText size="small" color={COLORS.redLight}>
            {errMess.coordinate}
          </EZText>
        )}
        <TouchableOpacity
          onPress={() => {
            setShowDateTimePicker({
              ...showDateTimePicker,
              ['open']: !showDateTimePicker.open,
            });
          }}>
          <EZInput
            label="Open time"
            styleEZInput={{marginBottom: SPACING.mbInputItem}}
            placeholder="Open time"
            errMess={errMess.open}
            value={params.open}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowDateTimePicker({
              ...showDateTimePicker,
              ['close']: !showDateTimePicker.close,
            });
          }}>
          <EZInput
            label="Close time"
            styleEZInput={{marginBottom: SPACING.mbInputItem}}
            placeholder="Close time"
            errMess={errMess.close}
            value={params.close}
            editable={false}
          />
        </TouchableOpacity>
        {params.images.length > 0 && (
          <ScrollView contentContainerStyle={styles.imgList} collapsable>
            {params.images.map((item, index) => {
              return (
                <Image
                  key={index}
                  source={{uri: item}}
                  style={[styles.imgItem]}
                />
              );
            })}
          </ScrollView>
        )}
        {params.imagesUpdate.length > 0 ? (
          <EZSlider data={params.imagesUpdate} local />
        ) : (
          <TouchableOpacity
            onPress={handlePickImage}
            style={styles.uploadImage}>
            <Lottie
              source={require('../../../assets/images/upload.json')}
              autoPlay
              loop
              style={{position: 'relative', width: 100, height: 100}}
            />
            <EZText>Upload images </EZText>
          </TouchableOpacity>
        )}
        {errMess.imagesUpdate && (
          <EZText size="small" color={COLORS.redLight}>
            {errMess.imagesUpdate}
          </EZText>
        )}
        <EZButton
          styleEZButton={{marginVertical: 20}}
          title="Update"
          handlePress={handleEdit}
        />
      </ScrollView>
      <EZRBSheet
        height={Dimensions.get('window').height}
        closeBtn={false}
        refRBSheet={refRBSheet}>
        <EZContainer>
          <TouchableOpacity style={styles.btnClose} onPress={handleClose}>
            <Icon name="x" size={FONTSIZE.iconLarge} color={COLORS.redLight} />
          </TouchableOpacity>
          <View style={styles.textGuide}>
            <EZText bold size="quiteLarge" color={COLORS.secondary}>
              Hold and drag the marker
            </EZText>
            <EZText bold>{params.address}</EZText>
            <EZButtonText
              text="Done"
              color={COLORS.primary}
              handlePress={handleClose}
            />
          </View>
          <EZMapView
            region={coordinate}
            handleSearch={details => handleSearch(details)}
            dragMarker
            handleDragMarker={e => handleGetAddress(e.nativeEvent.coordinate)}
            // handleOnPressMap={e => handleGetAddress(e.nativeEvent.coordinate)}
            refInput={refInput}
            placeholderSearch="Your parking lot address"
            setText={params.address}
            styleSearch={{
              top: 20,
              zIndex: 10,
            }}
          />
        </EZContainer>
      </EZRBSheet>
    </EZContainer>
  );
};

export default EditParkingLot;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.pxComponent,
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 15,
    gap: 20,
    alignItems: 'center',
  },
  form: {width: '100%'},
  btnClose: {
    position: 'absolute',
    top: 35,
    left: 10,
    zIndex: 10,
  },
  textGuide: {
    position: 'absolute',
    zIndex: 10,
    paddingHorizontal: SPACING.pxComponent,
    backgroundColor: COLORS.overlay,
    width: '100%',
    justifyContent: 'flex-start',
    paddingBottom: 100,
    paddingTop: 20,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: COLORS.primary,
    borderTopWidth: 2,
  },
  uploadImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderStyle: 'dashed',
  },
  btnPick: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  imgList: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: (Dimensions.get('screen').width - SPACING.pxComponent * 2) * 0.02,
  },
  imgItem: {
    width: '48%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
