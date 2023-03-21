import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {
  bgDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../assets/styles/styles';
import ScanQRCode from '../views/scanQRcode/ScanQRCode';
import Notification from '../views/notification/Notification';
import EZText from '../components/core/EZText';
import HomeStackNavigators from './HomeStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {isSpaceOwner, useGetUserInfo} from '../hooks/api/auth';
import {useEffect, useState} from 'react';
import AccountStackNavigators from './AccountStackNavigator';
import Bookmark from '../views/bookmark/Bookmark';
import useRQGlobalState from '../hooks/useRQGlobal';
import {AVATAR} from '../utils/defaultImage';
import { getData } from '../shared/asyncStorages';
import NotificationtackNavigators from './NotificationStackNavigator';

const BottomTab = () => {
  const navigation = useNavigation();
  const {BG} = bgDefault();
  const {COLOR} = colorDefault();
  const mutationUserInfo = useGetUserInfo();
  const [userInfo, setUserInfo] = useRQGlobalState('user', {
    avatar: AVATAR,
    fullName: '',
    id: '',
    isSpaceOwner: false,
    email: '',
  });
  useEffect(() => {
    if (mutationUserInfo.isSuccess) {
      setUserInfo({
        ...userInfo,
        ['avatar']: mutationUserInfo.data.data[0].avatar,
        ['fullName']: mutationUserInfo.data.data[0].fullName,
        ['id']: mutationUserInfo.data.data[0].id,
        ['email']: mutationUserInfo.data.data[0].email,
      });
    }
  }, [mutationUserInfo.status]);
  useEffect(() => {
    const isSpaceOwnerAccount = async () => {
      const result = await isSpaceOwner();
      const EZUid = await getData('EZUid');
      mutationUserInfo.mutate(EZUid);
      setUserInfo({
        ...userInfo,
        ['isSpaceOwner']: result,
      });
    };
    isSpaceOwnerAccount();
  }, []);
  const focusIcon = isFocused => {
    return isFocused ? styles.isFocused : styles.isUnfocused;
  };
  const focusText = isFocused => {
    return isFocused ? styles.isFocusedText : styles.isUnfocusedText;
  };

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: 50,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="homeStack"
        component={HomeStackNavigators}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return <EZText styleEZText={focusText(focused)}>Home</EZText>;
            },
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="home"
                  style={[
                    focusIcon(focused),
                    {color: focused ? COLOR : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: BG,
            },
          };
        }}
      />
      <Tab.Screen
        name="saved"
        component={Bookmark}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return <EZText styleEZText={focusText(focused)}>Saved</EZText>;
            },
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="bookmark"
                  style={[
                    focusIcon(focused),
                    {color: focused ? COLOR : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: BG,
            },
            title: 'Saved parking lot',
          };
        }}
      />
      {userInfo.isSpaceOwner && (
        <Tab.Screen
          name="scanQRCode"
          component={ScanQRCode}
          options={() => {
            return {
              tabBarLabel: ({focused}) => {
                return (
                  <EZText styleEZText={focusText(focused)}>QR Code</EZText>
                );
              },
              tabBarIcon: ({focused}) => {
                return (
                  <Ionicon name="qr-code-outline" style={styles.iconCenter} />
                );
              },
              tabBarItemStyle: {
                paddingBottom: 5,
                backgroundColor: BG,
                position: 'relative',
              },
              title: 'Scan QR Code',
            };
          }}
        />
      )}
      <Tab.Screen
        name="notiStack"
        component={NotificationtackNavigators}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return (
                <EZText styleEZText={focusText(focused)}>Notification</EZText>
              );
            },
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    color={COLOR}
                    size={FONTSIZE.iconLarge}
                  />
                </TouchableOpacity>
              );
            },
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="bell"
                  style={[
                    focusIcon(focused),
                    {color: focused ? COLOR : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: BG,
            },
            title: 'Notification',
            headerShown: false,
            headerTintColor: COLOR,
            headerStyle: {backgroundColor: BG},
          };
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountStackNavigators}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return <EZText styleEZText={focusText(focused)}>Account</EZText>;
            },
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="user"
                  style={[
                    focusIcon(focused),
                    {color: focused ? COLOR : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: BG,
            },
            title: 'Account',
          };
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  isFocused: {
    fontWeight: '600',
    fontSize: FONTSIZE.iconLarge,
  },
  isUnfocused: {
    fontWeight: '400',
    fontSize: FONTSIZE.iconMedium,
  },
  isFocusedText: {
    fontWeight: '500',
    fontSize: FONTSIZE.small,
  },
  isUnfocusedText: {
    color: COLORS.disable,
    fontWeight: '400',
    fontSize: FONTSIZE.small,
  },
  iconCenter: {
    backgroundColor: COLORS.primary,
    padding: 8,
    fontSize: FONTSIZE.iconLarge,
    borderRadius: 50,
    color: COLORS.white,
    position: 'absolute',
    overflow: 'hidden',
    top: -24,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.0,
    elevation: 20,
  },
});

export default BottomTab;
