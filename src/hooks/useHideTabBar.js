import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

export const useHideTabBar = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: 50,
          borderTopWidth: 0,
          position: 'absolute',
        },
      });
  }, [navigation]);
};
