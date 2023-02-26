import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import {COLORS, EZStatusBar, SPACING} from '../../assets/styles/styles';
import EZInput from '../../components/core/EZInput';
import {AVATAR} from '../../utils/defaultImage';

const Chat = () => {
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    console.log('searchingggg');
  };
  return (
    <EZContainer styleEZContainer={{padding: SPACING.pxComponent}}>
      <EZInput
        placeholder="Search messages"
        onChangeText={text => setSearch(text)}
        defaultValue={search}
        iconName="search"
        handlePressIcon={handleSearch}
      />
      <View style={styles.messageItem}>
        <Image source={{uri: AVATAR}} style={styles.avatar} />
        <View style={styles.messageMid}>
            <EZText bold color={COLORS.primary}>
              Hoang Tuan Minh
            </EZText>
            <EZText lines={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, fugit.</EZText>
        </View>
        <View style={styles.messageRight}>
          <EZText>15:33</EZText>
          <View style={styles.new} />
        </View>
      </View>
    </EZContainer>
  );
};

export default Chat;

const styles = StyleSheet.create({
  messageItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomColor: COLORS.borderBrighter,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  messageMid: {
    justifyContent: 'space-between',
    maxWidth: '75%',
  },
  new: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: COLORS.redLight,
  },
  messageRight: {
    alignItems: 'center',
  }
});
