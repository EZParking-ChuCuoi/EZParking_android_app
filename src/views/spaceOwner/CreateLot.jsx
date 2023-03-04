import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {EZButtonBack, EZButtonText} from '../../components/core/EZButton';
import {COLORS, FONTSIZE, SPACING} from '../../assets/styles/styles';
import EZInput from '../../components/core/EZInput';
import EZRBSheet from '../../components/core/EZRBSheet';
import MapView from 'react-native-maps';
import {getDataObj} from '../../shared/asyncStorages';
import EZMapView from '../../components/core/EZMapView';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';

const CreateLot = () => {
  const refInput = useRef();
  const refRBSheet = useRef();
  const [params, setParams] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    open: null,
    close: null,
    images: [],
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
      setCoordinate(coor);
    };
    getCoor();
  }, []);

  console.log(params);
  const handleSearch = details => {
    setCoordinate({
      ...coordinate,
      ['latitude']: details?.geometry?.location?.lat,
      ['longitude']: details?.geometry?.location?.lng,
    });
  };
  const handleClose = () => {
    setParams({
      ...params,
      ['address']: refInput.current?.getAddressText(),
    });
    refRBSheet.current.close();
    if (coordinateDrag !== undefined) {
      setCoordinate(coordinateDrag);
    }
  };
  const handlePickImage = () => {
    ImageCropPicker.openPicker({
      includeExif: true,
      mediaType: 'photo',
      multiple: true,
      cropping: true,
    }).then(img => {
      setParams({...params, ['images']: img});
    });
  };
  return (
    <EZContainer styleEZContainer={styles.container}>
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
      <ScrollView>
        <EZInput
          label="Parking lot name"
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          placeholder="Name"
          defaultValue={params.name}
          onChangeText={name => setParams({...params, ['name']: name})}
        />
        <Pressable
          onPress={() => {
            refRBSheet.current.open();
            refInput.current?.setAddressText(params.address);
          }}>
          <EZInput
            label="Address"
            styleEZInput={{marginBottom: SPACING.mbInputItem}}
            placeholder="Address"
            value={params.address}
            editable={false}
          />
        </Pressable>
        <Pressable
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
            value={params.open}
            editable={false}
          />
        </Pressable>
        <Pressable
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
            value={params.close}
            editable={false}
          />
        </Pressable>
        <ScrollView contentContainerStyle={styles.images}>
          
        </ScrollView>
      </ScrollView>
      <EZRBSheet
        height={Dimensions.get('window').height}
        closeBtn={false}
        refRBSheet={refRBSheet}>
        <EZContainer>
          <TouchableOpacity style={styles.btnClose} onPress={handleClose}>
            <Icon name="x" size={FONTSIZE.iconLarge} color={COLORS.redLight} />
          </TouchableOpacity>
          <EZText styleEZText={styles.textGuide}>
            Holding and dragging the marker to the right place will help us
            pinpoint your exact location
          </EZText>
          <EZMapView
            region={coordinate}
            handleSearch={details => handleSearch(details)}
            dragMarker
            handleDragMarker={e => setCoordinateDrag(e.nativeEvent.coordinate)}
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

export default CreateLot;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.pxComponent,
  },
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
    backgroundColor: COLORS.greenOverlay,
    width: '100%',
    justifyContent: 'flex-start',
    paddingBottom: 50,
    paddingTop: 20,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
