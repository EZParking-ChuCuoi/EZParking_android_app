import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {AVATAR} from '../../utils/defaultImage';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  SPACING,
} from '../../assets/styles/styles';
import EZInput from '../../components/core/EZInput';
import ParkingLotBlock from '../../components/home/ParkingLotBlock';
import {useRoute} from '@react-navigation/native';
import {
  dateFormatMoment,
  datePostToApi,
  formatTimeApi,
  handleDate,
} from '../../shared/handleDate';
import {DURATION, VEHICLE_TYPE} from '../../utils/defaultDataSelection';
import BookingInfoTop from '../../components/home/BookingInfoTop';
import DatePicker from 'react-native-date-picker';
import {useGetSlots} from '../../hooks/api/getParkingLots';
import EZLoading from '../../components/core/EZLoading';

const BookingParkingLot = ({navigation, route}) => {
  const {info} = route.params;
  const mutationGetSlots = useGetSlots();
  const [params, setParams] = useState({
    licensePlate: '',
    vehicleType: '',
    duration: '',
    dateStart: '',
    dateReturn: '',
  });
  const [showVehicle, setShowVehicle] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState({
    start: false,
    end: false,
  });
  useEffect(() => {
    navigation.setOptions({
      title: info.nameParkingLot,
    });
  }, []);
  useEffect(() => {
    if (
      params.duration !== '' &&
      params.dateStart !== '' &&
      params.dateReturn !== ''
    ) {
      mutationGetSlots.mutate({
        start_datetime: datePostToApi(params.dateStart),
        end_datetime: datePostToApi(params.dateReturn),
        id: info.id,
      });
    }
  }, [params.dateStart, params.dateReturn]);

  return (
    <EZContainer>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <BookingInfoTop info={info} />
        {mutationGetSlots.isLoading && <EZLoading/>}
        <View style={styles.form}>
          <View style={styles.formLeft}>
            <EZInput
              styleEZInput={{marginBottom: SPACING.mbInputItem}}
              onChangeText={licensePlate =>
                setParams({...params, ['license']: licensePlate})
              }
              defaultValue={params.licensePlate}
              placeholder="License plate"
            />
            <View style={styles.dropDown}>
              <EZInput
                styleEZInput={{marginBottom: SPACING.mbInputItem}}
                onChangeText={licensePlate =>
                  setParams({...params, ['license']: licensePlate})
                }
                defaultValue={params.duration}
                placeholder="Duration"
                iconName="chevron-down"
                editable={false}
                handlePressIcon={() => setShowDuration(!showDuration)}
              />
              <View style={styles.dropDownContainer}>
                {showDuration &&
                  DURATION.map((duration, index) => {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setParams({...params, ['duration']: duration.value});
                          setShowDuration(!showDuration);
                        }}
                        style={[styles.dropDownItem]}>
                        <EZText>{duration.label}</EZText>
                      </Pressable>
                    );
                  })}
              </View>
            </View>
          </View>
          <View style={styles.formRight}>
            <View style={styles.dropDown}>
              <EZInput
                styleEZInput={{marginBottom: SPACING.mbInputItem}}
                onChangeText={licensePlate =>
                  setParams({...params, ['license']: licensePlate})
                }
                defaultValue={params.vehicleType}
                placeholder="Vehicle type"
                iconName="chevron-down"
                editable={false}
                handlePressIcon={() => setShowVehicle(!showVehicle)}
              />
              <View style={styles.dropDownContainer}>
                {showVehicle &&
                  VEHICLE_TYPE.map((vehicle, index) => {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setParams({
                            ...params,
                            ['vehicleType']: vehicle.value,
                          });
                          setShowVehicle(!vehicle);
                        }}
                        style={[styles.dropDownItem]}>
                        <EZText>{vehicle.label}</EZText>
                      </Pressable>
                    );
                  })}
              </View>
            </View>
            <View style={styles.formTime}>
              <EZInput
                styleEZInput={{width: '47%'}}
                onChangeText={licensePlate =>
                  setParams({...params, ['license']: licensePlate})
                }
                defaultValue={
                  params.dateStart !== ''
                    ? params.duration === 'daily'
                      ? handleDate(params.dateStart).slice(0, 5)
                      : handleDate(params.dateStart).slice(7)
                    : ''
                }
                placeholder="Date start"
                iconName="chevron-down"
                handlePressIcon={() => {
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['start']: true,
                  });
                }}
                editable={false}
              />
              <DatePicker
                modal
                title="Choose booking start"
                open={showDateTimePicker.start}
                mode={params.duration === 'daily' ? 'time' : 'date'}
                date={new Date()}
                minimumDate={new Date()}
                maximumDate={
                  params.dateReturn !== ''
                    ? new Date(params.dateReturn)
                    : new Date()
                }
                onConfirm={date => {
                  setParams({...params, ['dateStart']: date});
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['start']: !showDateTimePicker.start,
                  });
                }}
                onCancel={() =>
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['start']: !showDateTimePicker.start,
                  })
                }
              />
              <EZInput
                styleEZInput={{width: '50%'}}
                onChangeText={licensePlate =>
                  setParams({...params, ['license']: licensePlate})
                }
                defaultValue={
                  params.dateReturn !== ''
                    ? params.duration === 'daily'
                      ? handleDate(params.dateReturn).slice(0, 5)
                      : handleDate(params.dateReturn).slice(7)
                    : ''
                }
                placeholder="Date return"
                iconName="chevron-down"
                handlePressIcon={() => {
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['end']: !showDateTimePicker.end,
                  });
                }}
                editable={false}
              />
              <DatePicker
                modal
                title="Choose booking return"
                open={showDateTimePicker.end}
                date={new Date()}
                mode={params.duration === 'daily' ? 'time' : 'date'}
                minimumDate={
                  params.dateStart !== ''
                    ? new Date(params.dateStart)
                    : new Date()
                }
                onConfirm={date => {
                  setParams({...params, ['dateReturn']: date});
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['end']: !showDateTimePicker.end,
                  });
                }}
                onCancel={() =>
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['end']: !showDateTimePicker.end,
                  })
                }
              />
            </View>
          </View>
        </View>
        <EZText bold>Choose a parking slot</EZText>
        <FlatList
          data={mutationGetSlots.data?.data || []}
          keyExtractor={item => item.block_id}
          renderItem={({item}) => <ParkingLotBlock item={item} />}
          ListEmptyComponent={mutationGetSlots.isLoading && <EZLoading />}
          horizontal
          pagingEnabled
        />
      </ScrollView>
    </EZContainer>
  );
};

export default BookingParkingLot;

const styles = StyleSheet.create({
  form: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  formLeft: {
    width: '30%',
  },
  formRight: {
    width: '68%',
  },
  formTime: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: SPACING.pxComponent,
    zIndex: 100,
  },
  dropDown: {
    width: '100%',
    position: 'relative',
  },
  dropDownContainer: {
    width: '100%',
    borderRadius: 4,
    gap: 4,
    backgroundColor: COLORS.borderBrighter,
  },
  dropDownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: COLORS.tertiary,
  },
});
