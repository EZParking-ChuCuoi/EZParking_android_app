import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../../components/core/EZContainer';
import {EZButton} from '../../components/core/EZButton';
import EZText from '../../components/core/EZText';
import {colorDefault, COLORS, FONTSIZE, SPACING} from '../../assets/styles/styles';
import {
  NAVIGATED_PROFILE,
  NAVIGATED_PROFILE_SPACEOWNER,
} from '../../components/account/constants';
import NavigatedOption from '../../components/account/NavigatedOptions';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {isSpaceOwner, logOut} from '../../shared/auth';

const Account = () => {
  const navigation = useNavigation();
  const {COLOR} = colorDefault();
  const isSpaceOwnerAccount = isSpaceOwner();
  const url =
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80';
  const userName = 'Whatyouknowabout';

  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      <View style={styles.topContainer}>
        <Image source={{uri: url}} style={styles.imageUser} />
        <EZText bold>{userName}</EZText>
      </View>
      <View style={styles.listOption}>
        {isSpaceOwner
          ? NAVIGATED_PROFILE_SPACEOWNER.map((option, index) => {
              return <NavigatedOption data={option} key={index} />;
            })
          : NAVIGATED_PROFILE.map((option, index) => {
              return <NavigatedOption data={option} key={index} />;
            })}
      </View>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => logOut(navigation)}>
        <Icon name="log-out" size={FONTSIZE.iconLarge} color={COLOR} />
        <EZText styleEZText={{width: '85%'}}>Log out</EZText>
      </TouchableOpacity>
      <EZButton
        title="Create a car park"
        styleEZButton={{marginTop: 30}}
        handlePress={() => console.log('create car park')}
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
