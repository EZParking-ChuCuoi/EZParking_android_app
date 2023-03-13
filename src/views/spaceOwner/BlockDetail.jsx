import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {
  useCreateSlot,
  useDeleteSlot,
  useGetSlotsOfBlock,
} from '../../hooks/api/useSpaceOwnerAction';
import {COLORS, FONTSIZE, SPACING} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import EZLoading from '../../components/core/EZLoading';
import Lottie from 'lottie-react-native';
import {EZButtonIcon, EZButtonText} from '../../components/core/EZButton';
import EZRBSheet from '../../components/core/EZRBSheet';
import FormSlot from '../../components/spaceOwner/block/FormSlot';

const BlockDetail = ({navigation, route}) => {
  const mutationGetSlot = useGetSlotsOfBlock();
  const muationDeleteSlot = useDeleteSlot();
  const {idBlock, nameBlock} = route.params;
  const refCreate = useRef();
  const refEdit = useRef();
  const [idSlotArr, setIdSlotArr] = useState([]);
  const [slotItem, setSlotItem] = useState();
  const handlePressSlot = id => {
    if (idSlotArr.includes(id)) {
      setIdSlotArr(prev => prev.filter(item => item !== id));
    } else {
      setIdSlotArr(prev => [...prev, id]);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: nameBlock,
      headerRight: () => {
        return (
          <EZButtonText
            text="Create"
            color={COLORS.primary}
            handlePress={() => refCreate.current.open()}
          />
        );
      },
    });
    mutationGetSlot.mutate(idBlock);
  }, []);
  useEffect(() => {
    if (muationDeleteSlot.isSuccess) {
      refresh();
      setIdSlotArr([]);
    }
  }, [muationDeleteSlot.status]);
  const handleDeleteSlot = () => {
    muationDeleteSlot.mutate({
      idSlotArr,
      idBlock: idBlock,
    });
  };

  const refresh = () => {
    mutationGetSlot.mutate(idBlock);
  };
  const SlotItem = ({slot}) => {
    const BG = slot?.status === 'available' ? COLORS.tertiary : COLORS.disable;
    return (
      <TouchableOpacity
        onPress={() => {
          if (slot?.status === 'available') {
            handlePressSlot(slot.id);
          }
        }}
        onLongPress={() => {
          refEdit.current.open();
          setSlotItem(slot);
        }}
        style={[{backgroundColor: BG}, styles.slotItem]}>
        <EZText>{slot.slotName}</EZText>
        <View style={styles.tick}>
          {idSlotArr.includes(slot?.id) && (
            <Icon
              name="check-circle"
              size={FONTSIZE.iconLarge}
              color={COLORS.redLight}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <EZContainer>
      {muationDeleteSlot.isLoading && <EZLoading />}
      <EZRBSheet refRBSheet={refCreate} height={300}>
        <FormSlot blockId={idBlock} refForm={refCreate} refresh={refresh} />
      </EZRBSheet>
      <EZRBSheet refRBSheet={refEdit} height={300}>
        <FormSlot
          blockId={idBlock}
          refForm={refEdit}
          refresh={refresh}
          slotItem={slotItem}
        />
      </EZRBSheet>
      <ScrollView contentContainerStyle={styles.slotContainer}>
        {mutationGetSlot.isLoading && <EZLoading />}
        {mutationGetSlot.isSuccess &&
          mutationGetSlot.data.map(slot => {
            return <SlotItem slot={slot} key={slot.id} />;
          })}
        {!mutationGetSlot.isLoading && !mutationGetSlot?.data?.length > 0 ? (
          <View style={styles.contentEmpty}>
            <Lottie
              source={require('../../assets/images/emptySlot.json')}
              autoPlay
              loop
              style={styles.image}
            />
          </View>
        ) : null}
      </ScrollView>
      <EZButtonIcon
        iconName="trash-2"
        color={COLORS.redLight}
        size={FONTSIZE.iconHuge}
        handlePress={handleDeleteSlot}
        styleEZButtonIcon={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          display: idSlotArr.length > 0 ? 'flex' : 'none',
        }}
      />
    </EZContainer>
  );
};

export default BlockDetail;

const styles = StyleSheet.create({
  slotContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 10,
  },
  slotItem: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'relative',
    width: '100%',
    resizeMode: 'cover',
  },
  tick: {
    position: 'absolute',
    top: 3,
    right: 3,
    elevation: 8,
  },
});
