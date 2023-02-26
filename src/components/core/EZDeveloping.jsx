import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from './EZContainer';
import EZText from './EZText';
import {COLORS} from '../../assets/styles/styles';
import {EZButtonBack} from './EZButton';

const EZDeveloping = props => {
  return (
    <EZContainer
      styleEZContainer={{alignItems: 'center', justifyContent: 'center'}}>
      {props.back && <EZButtonBack />}
      {props.title && (
        <EZText size="quiteLarge" bold color={COLORS.primary}>
          {props.title}
        </EZText>
      )}
      <Image
        source={require('../../assets/images/oops.png')}
        style={styles.oops}
      />
      <EZText bold color={COLORS.secondary}>
        This feature is in development, please come back next time!
      </EZText>
    </EZContainer>
  );
};

export default EZDeveloping;

const styles = StyleSheet.create({
  oops: {
    width: '100%',
    resizeMode: 'contain',
  },
});
