import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import {EZButton} from '../../components/core/EZButton';
import EZText from '../../components/core/EZText';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import {
  NAVIGATED_PROFILE,
  NAVIGATED_PROFILE_SPACEOWNER,
} from '../../components/account/constants';
import NavigatedOption from '../../components/account/NavigatedOptions';
import Icon from 'react-native-vector-icons/Feather';
import {logOut} from '../../shared/auth';
import EZRBSheet from '../../components/core/EZRBSheet';
import Lottie from 'lottie-react-native';
import EZRBSheetModal from '../../components/core/EZRBSheetModal';
import EditAccount from './EditAccount';
import useRQGlobalState from '../../hooks/useRQGlobal';

const Account = ({navigation, route}) => {
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const refRBSheet = useRef();
  const refEdit = useRef();
  const [userInfo] = useRQGlobalState('user', {});
  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      <View style={styles.topContainer}>
        <Image
          source={{
            uri: userInfo.avatar,
          }}
          style={styles.imageUser}
        />
        <EZText bold size="quiteLarge">
          {userInfo.fullName}
        </EZText>
      </View>
      <FlatList
        renderItem={({item}) => <NavigatedOption data={item} />}
        keyExtractor={item => item.text}
        data={
          userInfo.isSpaceOwner
            ? NAVIGATED_PROFILE_SPACEOWNER
            : NAVIGATED_PROFILE
        }
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.container}
            onPress={() => refEdit.current.open()}>
            <Icon name="edit-3" color={COLOR} size={FONTSIZE.iconLarge} />
            <View style={styles.content}>
              <EZText>Edit profile</EZText>
              <Icon
                name="chevron-right"
                color={COLORS.borderInput}
                size={FONTSIZE.iconMedium}
              />
            </View>
          </TouchableOpacity>
        }
        ListFooterComponent={
          <View>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => refRBSheet.current.open()}>
              <Icon
                name="log-out"
                size={FONTSIZE.iconLarge}
                color={COLORS.redLight}
              />
              <EZText styleEZText={{width: '85%'}} color={COLORS.redLight}>
                Log out
              </EZText>
            </TouchableOpacity>
            {!userInfo.isSpaceOwner && (
              <EZButton
                title="Create a car park"
                handlePress={() =>
                  navigation.navigate('auth', {
                    screen: 'registerSpaceOwner',
                  })
                }
              />
            )}
          </View>
        }
      />
      {userInfo.isSpaceOwner && (
        <TouchableOpacity
          style={[
            styles.btnDashboard,
            {backgroundColor: BG2ND, shadowColor: COLOR},
          ]}
          onPress={() =>
            navigation.navigate('spaceOwner', {screen: 'dashboard'})
          }>
          <EZText bold>DASHBOARD</EZText>
          <Lottie
            source={require('../../assets/images/dashboard.json')}
            autoPlay
            loop
            style={styles.imgDashboard}
          />
        </TouchableOpacity>
      )}
      <EZRBSheet refRBSheet={refEdit} height={700}>
        <EZContainer
          styleEZContainer={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
          }}>
          <EditAccount onRefresh={() => {}} refEdit={refEdit} />
        </EZContainer>
      </EZRBSheet>
      <EZRBSheetModal refRBSheet={refRBSheet} height={200}>
        <EZText styleEZText={{marginBottom: 10}}>Log out?</EZText>
        <View style={styles.btnModal}>
          <EZButton
            w="40%"
            title="Yes"
            type="secondary"
            handlePress={() => {
              refRBSheet.current.close();
              logOut(navigation);
            }}
          />
          <EZButton
            w="40%"
            title="No"
            handlePress={() => refRBSheet.current.close()}
          />
        </View>
      </EZRBSheetModal>
    </EZContainer>
  );
};

export default Account;

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderBrighter,
    paddingBottom: 20,
  },
  imageUser: {
    width: 120,
    height: 120,
    borderRadius: 70,
    resizeMode: 'cover',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.borderInput,
  },
  logoutBtn: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: COLORS.borderBrighter,
    borderBottomWidth: 1,
  },
  btnDashboard: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgDashboard: {
    position: 'relative',
    width: 70,
    height: 70,
  },
  btnModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    borderBottomColor: COLORS.borderInput,
    borderBottomWidth: 0.3,
    paddingVertical: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});
