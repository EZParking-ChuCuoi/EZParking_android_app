import {
  Animated,
  FlatList,
  Image,
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
  formatTimeFull,
  handleDate,
} from '../../shared/handleDate';
import {DURATION, VEHICLE_TYPE} from '../../utils/defaultDataSelection';
import BookingInfoTop from '../../components/home/BookingInfoTop';
import DatePicker from 'react-native-date-picker';
import {useGetSlots} from '../../hooks/api/getParkingLots';
import EZLoading from '../../components/core/EZLoading';
import {EZButton, EZButtonText} from '../../components/core/EZButton';
import moment, {duration} from 'moment';
import EZSliderPagination from '../../components/core/EZSliderPagination';
import EZRBSheetModal from '../../components/core/EZRBSheetModal';

const BookingParkingLot = ({navigation, route}) => {
  const {info} = route.params;
  const [idSlotArr, setIdSlotArr] = useState([]);
  const mutationGetSlots = useGetSlots();
  const {BG2ND} = bgSecondaryDefault();
  const refErr = useRef();
  const [params, setParams] = useState({
    duration: '',
    dateStart: '',
    dateReturn: '',
  });
  const [showDuration, setShowDuration] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState({
    start: false,
    end: false,
  });
  const [index, setIndex] = useState(0);
  const [errMess, setErrMess] = useState({
    date: '',
  });
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleScroll = e => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {useNativeDriver: false},
    )(e);
  };
  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;
  const handleviewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNextBtn = () => {
    if (
      params.duration !== '' &&
      params.dateStart !== '' &&
      params.dateReturn !== ''
    ) {
      if (idSlotArr.length < 1) {
        setErrMess({
          ...errMess,
          ['slot']: 'Choose at least 1 slot to continue!',
        });
        refErr.current.open();
      } else {
        navigation.navigate('preview', {
          dateStart: dateFormatMoment(params.dateStart),
          dateReturn: dateFormatMoment(params.dateReturn),
          idSlotArr,
        });
      }
    }
  };
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
      if (params.dateReturn < params.dateStart) {
        setErrMess({
          ...errMess,
          ['date']: 'The return time cannot be earlier than the booking time!',
        });
        refErr.current.open();
        mutationGetSlots.reset();
      } else if (
        moment(params.dateStart).month() == moment(params.dateReturn).month() &&
        moment(params.dateStart).date() == moment(params.dateReturn).date() &&
        moment(params.dateReturn - params.dateStart).minutes() < 59
      ) {
        setErrMess({
          ...errMess,
          ['date']: 'Duration must be greater than 1 hour!',
        });
        refErr.current.open();
        mutationGetSlots.reset();
      } else {
        setErrMess({
          date: '',
        });
        mutationGetSlots.mutate({
          start_datetime: dateFormatMoment(params.dateStart),
          end_datetime: dateFormatMoment(params.dateReturn),
          id: info.id,
        });
      }
    }
  }, [params.dateStart, params.dateReturn]);
  return (
    <EZContainer>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <BookingInfoTop info={info} />
        {mutationGetSlots.isLoading && <EZLoading />}
        <View style={styles.form}>
          <View style={styles.formLeft}>
            <View style={styles.dropDown}>
              <TouchableOpacity onPress={() => setShowDuration(!showDuration)}>
                <EZInput
                  styleEZInput={{marginBottom: SPACING.mbInputItem}}
                  defaultValue={params.duration}
                  placeholder="Duration"
                  iconName="chevron-down"
                  editable={false}
                  handlePressIcon={() => setShowDuration(!showDuration)}
                />
              </TouchableOpacity>
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
            <View style={styles.formTime}>
              <TouchableOpacity
                onPress={() => {
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['start']: true,
                  });
                }}
                style={{width: '47%'}}>
                <EZInput
                  defaultValue={
                    params.dateStart !== ''
                      ? params.duration === 'today'
                        ? handleDate(params.dateStart).slice(0, 5)
                        : handleDate(params.dateStart).slice(7)
                      : ''
                  }
                  placeholder="Start"
                  iconName="chevron-down"
                  handlePressIcon={() => {
                    setShowDateTimePicker({
                      ...showDateTimePicker,
                      ['start']: true,
                    });
                  }}
                  editable={false}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                title="Choose booking starting"
                open={showDateTimePicker.start}
                mode={
                  params.duration === 'daily'
                    ? 'datetime'
                    : params.duration === 'today'
                    ? 'time'
                    : 'date'
                }
                date={new Date()}
                minimumDate={new Date()}
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
              <TouchableOpacity
                onPress={() => {
                  setShowDateTimePicker({
                    ...showDateTimePicker,
                    ['end']: !showDateTimePicker.end,
                  });
                }}
                style={{width: '50%'}}>
                <EZInput
                  defaultValue={
                    params.dateReturn !== ''
                      ? params.duration === 'today'
                        ? handleDate(params.dateReturn).slice(0, 5)
                        : handleDate(params.dateReturn).slice(7)
                      : ''
                  }
                  placeholder="End"
                  iconName="chevron-down"
                  handlePressIcon={() => {
                    setShowDateTimePicker({
                      ...showDateTimePicker,
                      ['end']: !showDateTimePicker.end,
                    });
                  }}
                  editable={false}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                title="Choose booking ending"
                open={showDateTimePicker.end}
                date={new Date()}
                mode={
                  params.duration === 'daily'
                    ? 'datetime'
                    : params.duration === 'today'
                    ? 'time'
                    : 'date'
                }
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <EZText bold>Choose parking slots</EZText>
          <EZButtonText
            text="Next step"
            color={COLORS.primary}
            handlePress={handleNextBtn}
            styleEZButtonText={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: BG2ND,
            }}
          />
        </View>
        {mutationGetSlots.isSuccess && (
          <EZSliderPagination
            data={mutationGetSlots.data?.data || []}
            scrollX={scrollX}
            index={index}
            top
          />
        )}
        <FlatList
          data={mutationGetSlots.data?.data || []}
          keyExtractor={item => item.block_id}
          renderItem={({item}) => (
            <ParkingLotBlock
              item={item}
              idSlotArr={idSlotArr}
              setIdSlotArr={setIdSlotArr}
            />
          )}
          ListEmptyComponent={mutationGetSlots.isLoading && <EZLoading />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          onScroll={handleScroll}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={handleviewabilityConfig}
        />
      </ScrollView>
      <EZRBSheetModal refRBSheet={refErr} height={200}>
        <EZText styleEZText={{marginBottom: 10}} color={COLORS.redLight}>
          {errMess?.date}
        </EZText>
        <EZText styleEZText={{marginBottom: 10}} color={COLORS.redLight}>
          {errMess?.slot}
        </EZText>
      </EZRBSheetModal>
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
