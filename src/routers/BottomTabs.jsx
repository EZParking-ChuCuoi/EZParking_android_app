import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, useColorScheme} from 'react-native';
import {COLORS, FONTSIZE} from '../assets/styles/styles';
import Home from '../views/Home';
import Chat from '../views/Chat';
import Setting from '../views/Account';
import ScanQRCode from '../views/ScanQRCode';
import Notification from '../views/Notification';
import EZText from '../components/core/EZText';
import Account from '../views/Account';

const BottomTab = () => {
  const isSpaceOwner = false;
  const isDarkMode = useColorScheme() === 'dark';
  const defaultIconColor = isDarkMode ? COLORS.white : COLORS.black;
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
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="home"
        component={Home}
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
                    {color: focused ? defaultIconColor : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
            },
          };
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return <EZText styleEZText={focusText(focused)}>Chat</EZText>;
            },
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="message-circle"
                  style={[
                    focusIcon(focused),
                    {color: focused ? defaultIconColor : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
            },
            title: 'Chat',
          };
        }}
      />
      {isSpaceOwner && (
        <Tab.Screen
          name="ScanQRCode"
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
                backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
                position: 'relative',
              },
              title: 'Scan QR Code',
            };
          }}
        />
      )}
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={() => {
          return {
            tabBarLabel: ({focused}) => {
              return (
                <EZText styleEZText={focusText(focused)}>Notification</EZText>
              );
            },
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="bell"
                  style={[
                    focusIcon(focused),
                    {color: focused ? defaultIconColor : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
            },
            title: 'Notification',
          };
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
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
                    {color: focused ? defaultIconColor : COLORS.disable},
                  ]}
                />
              );
            },
            tabBarItemStyle: {
              paddingBottom: 5,
              backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
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
