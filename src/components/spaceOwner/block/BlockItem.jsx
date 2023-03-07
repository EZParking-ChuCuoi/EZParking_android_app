import {
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
import {EZButton} from '../../core/EZButton';
import FormBlock from './FormBlock';
import {
  useDeleteBlock,
  useEditBlockInfo,
  useGetBlockInfo,
} from '../../../hooks/api/useSpaceOwnerAction';
import EZLoading from '../../core/EZLoading';
import EZRBSheet from '../../core/EZRBSheet';
import EZContainer from '../../core/EZContainer';

const BlockItem = props => {
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const refRBSheet = useRef();
  const refDelete = useRef();
  const mutationGetBlockInfo = useGetBlockInfo();
  const mutationEditBlock = useEditBlockInfo();
  const mutationDeleteBlock = useDeleteBlock();
  const [params, setParams] = useState({
    nameBlock: '',
    price: '',
    desc: '',
    carType: '',
  });
  let bg = [];
  if (props.createBtn) {
    bg = COLORS.linearBGPrimary;
  } else {
    bg = isDarkMode ? COLORS.linearBGDark : COLORS.linearBGLight;
  }
  const handleUpdate = () => {
    mutationEditBlock.mutate({
      idBlock: props.item.id,
      data: params,
    });
  };
  const handleResetForm = () => {
    setParams({
      nameBlock: '',
      price: '',
      desc: '',
      carType: '',
    });
  };
  const handleDelete = idBlock => {
    mutationDeleteBlock.mutate(idBlock);
  };
  const handleOpenEditForm = idBlock => {
    refRBSheet.current.open();
    mutationGetBlockInfo.mutate(idBlock);
  };
  useEffect(() => {
    if (mutationGetBlockInfo.isSuccess) {
      setParams({
        ...params,
        ['nameBlock']: mutationGetBlockInfo.data?.data.nameBlock,
        ['price']: mutationGetBlockInfo.data?.data.price.toString(),
        ['desc']: mutationGetBlockInfo.data?.data.desc,
        ['carType']: mutationGetBlockInfo.data?.data.carType,
      });
    }
    if (mutationEditBlock.isSuccess) {
      refRBSheet.current.close();
      props.handleRefresh();
      handleResetForm();
    }
  }, [mutationGetBlockInfo.status, mutationEditBlock.status]);
  useEffect(() => {
    if (mutationDeleteBlock.isSuccess) {
      props.handleRefresh();
    }
  }, [mutationDeleteBlock.status]);
  return (
    <TouchableOpacity
      style={[
        styles.managetedItem,
        {backgroundColor: BG2ND, shadowColor: COLOR},
      ]}
      onPress={() => {
        if (props.navigateTo) {
          navigation.navigate(props.navigateTo);
        } else if (props.createBtn) {
          props.handlePress();
        } else {
          return;
        }
      }}>
      {mutationEditBlock.isLoading && <EZLoading />}
      {mutationDeleteBlock.isLoading && <EZLoading />}
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0.3, 0.6, 0.9]}
        colors={bg}
        style={styles.linearGradient}>
        {props.iconName && (
          <Icon
            name={props.iconName}
            size={FONTSIZE.iconLarge}
            color={props.createBtn ? COLORS.secondary : COLORS.primary}
          />
        )}
        <EZText lines={2} bold>
          {props.text}
        </EZText>
        {props.children}
        {props.item && (
          <>
            <View style={styles.left}>
              {props.item.carType === '4-16SLOT' ? (
                <EZText>4 - 16 seats</EZText>
              ) : (
                <EZText>16 - 34 seats</EZText>
              )}
            </View>
            <View style={styles.btnGroup}>
              <EZButton
                type="noneWithColor"
                styleEZButton={{backgroundColor: BG2ND, marginBottom: 5}}
                color={COLORS.primary}
                w={100}
                icon="edit"
                handlePress={() => handleOpenEditForm(props.item.id)}
              />
              <EZButton
                type="noneWithColor"
                color={COLORS.redLight}
                styleEZButton={{backgroundColor: BG2ND}}
                w={100}
                icon="trash-2"
                handlePress={() => refDelete.current.open()}
              />
            </View>
            <EZRBSheet height={200} refRBSheet={refDelete}>
              <EZContainer
                styleEZContainer={{
                  padding: SPACING.pxComponent,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <EZText>Delete <EZText bold>{props.item.nameBlock}</EZText> block</EZText>
                <EZButton
                  title="Yes"
                  handlePress={() => handleDelete(props.item.id)}
                />
              </EZContainer>
            </EZRBSheet>
          </>
        )}
      </LinearGradient>
      <FormBlock
        refRBSheet={refRBSheet}
        params={params}
        setParams={setParams}
        handleSubmit={handleUpdate}
        editForm
        mutation={mutationGetBlockInfo}
      />
    </TouchableOpacity>
  );
};

export default BlockItem;

const styles = StyleSheet.create({
  managetedItem: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
    width: '100%',
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
  btnGroup: {
    position: 'absolute',
    right: 15,
  },
  left: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
});
