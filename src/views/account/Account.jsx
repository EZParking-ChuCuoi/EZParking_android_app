import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
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

const Account = () => {
  const navigation = useNavigation();
  const {COLOR} = colorDefault();
  let isSpaceOwnerAccount;
  const mutationUserInfo = useGetUserInfo();
  useEffect(() => {
    const setMutate = async () => {
      const uid = await getData('EZUid');
      const checkSpaceOwner = await isSpaceOwner();
      if (checkSpaceOwner) {
        isSpaceOwnerAccount = true;
      } else {
        isSpaceOwnerAccount = false;
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
              onPress={() => logOut(navigation)}>
              <Icon name="log-out" size={FONTSIZE.iconLarge} color={COLOR} />
              <EZText styleEZText={{width: '85%'}}>Log out</EZText>
            </TouchableOpacity>
            <EZButton
              title="Create a car park"
              handlePress={() => console.log('create car park')}
            />
          </View>
        }
      />
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
