import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import EZBgTopRounded from '../../components/core/EZBgTopRounded';
import {
  bgDefault,
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import AnimatedLoader from 'react-native-animated-loader';
import {EZButtonBack} from '../../components/core/EZButton';
import AnimatedLoading from '../../components/spaceOwner/dashboard/AnimatedLoading';
import Icon from 'react-native-vector-icons/Feather';
import EZInput from '../../components/core/EZInput';
import {Link} from '@react-navigation/native';
import DashboardItem from '../../components/spaceOwner/dashboard/DashboardItem';

const Dasboard = ({navigation}) => {
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const {BG} = bgDefault();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log(search);
  };
  return (
    <EZContainer bgEZStatusBar={COLORS.tertiary}>
      <TouchableOpacity
        style={[styles.btnBack, {backgroundColor: BG2ND, shadowColor: COLOR}]}
        onPress={() => navigation.navigate('profile')}>
        <Icon name="chevron-left" size={FONTSIZE.iconLarge} color={COLOR} />
      </TouchableOpacity>
      <AnimatedLoading />
      <EZBgTopRounded height={150}>
        <EZText size="large" bold>
          Dashoard
        </EZText>
        <EZInput
          styleEZInput={{
            position: 'absolute',
            bottom: -20,
            backgroundColor: BG,
            width: '85%',
          }}
          styleEZInputField={{
            paddingLeft: 15,
          }}
          placeholder="Search"
          onChangeText={newText => setSearch(newText)}
          iconName="send"
          handlePressIcon={handleSearch}
        />
      </EZBgTopRounded>
      <View style={styles.mainContent}>
        <EZText
          transform="uppercase"
          bold
          styleEZText={{paddingLeft: SPACING.pxComponent}}>
          Your parking lots
        </EZText>
        <ScrollView contentContainerStyle={styles.yourLots}>
          <DashboardItem
            navigateTo="createLot"
            text="Create new lot"
            iconName="plus"
          />
          <DashboardItem
            navigateTo="createLot"
            text="Create new lot"
          />
          <DashboardItem
            navigateTo="createLot"
            text="Create new lot"
            iconName="plus"
          />
          <DashboardItem navigateTo="createLot" text="Create new lot">
            <EZText>hi</EZText>
          </DashboardItem>
        </ScrollView>
      </View>
    </EZContainer>
  );
};

export default Dasboard;

const styles = StyleSheet.create({
  btnBack: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
  },
  yourLots: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 10,
  },
  mainContent: {
    marginTop: 30,
    width: '100%',
  },
});
