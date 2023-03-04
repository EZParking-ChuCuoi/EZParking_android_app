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
import {useNavigation} from '@react-navigation/native';
import {logOut} from '../../shared/auth';
import {isSpaceOwner, useGetUserInfo} from '../../hooks/api/auth';
import {getData} from '../../shared/asyncStorages';
import {AVATAR} from '../../utils/defaultImage';
import EZRBSheet from '../../components/core/EZRBSheet';

const Account = () => {
  const navigation = useNavigation();
  const {COLOR} = colorDefault();
  const [isSpaceOwnerAccount, setIsSpaceOwnerAccount] = useState(undefined);
  const mutationUserInfo = useGetUserInfo();
  const refRBSheet = useRef();
  useEffect(() => {
    const setMutate = async () => {
      const uid = await getData('EZUid');
      const checkSpaceOwner = await isSpaceOwner();
      if (checkSpaceOwner) {
        setIsSpaceOwnerAccount(true);
      }
      mutationUserInfo.mutate(uid);
    };
    setMutate();
  }, []);

  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      <View style={styles.topContainer}>
        <Image
          source={{
            uri: mutationUserInfo.isSuccess
              ? mutationUserInfo.data.data[0].avatar
              : AVATAR,
          }}
          style={styles.imageUser}
        />
        <EZText bold>
          {mutationUserInfo.isSuccess && mutationUserInfo.data.data[0].fullName}
        </EZText>
      </View>
      <FlatList
        renderItem={({item}) => <NavigatedOption data={item} />}
        keyExtractor={item => item.text}
        data={
          isSpaceOwnerAccount ? NAVIGATED_PROFILE_SPACEOWNER : NAVIGATED_PROFILE
        }
        ListFooterComponent={
          <View>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => refRBSheet.current.open()}>
              <Icon name="log-out" size={FONTSIZE.iconLarge} color={COLORS.redLight} />
              <EZText styleEZText={{width: '85%'}} color={COLORS.redLight}>Log out</EZText>
            </TouchableOpacity>
            {!isSpaceOwnerAccount && (
              <EZButton
                title="Create a car park"
                handlePress={() =>
                  navigation.navigate('auth', {screen: 'registerSpaceOwner'})
                }
              />
            )}
          </View>
        }
      />
      <EZRBSheet refRBSheet={refRBSheet} height={200}>
        <EZContainer
          styleEZContainer={{alignItems: 'center', justifyContent: 'center'}}>
          <EZText styleEZText={{marginBottom: 10}}>
            Are you sure you want to log out of the app?
          </EZText>
          <EZButton
            w="50%"
            title="Yes"
            handlePress={() => {
              refRBSheet.current.close();
              logOut(navigation);
            }}
          />
        </EZContainer>
      </EZRBSheet>
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
});
