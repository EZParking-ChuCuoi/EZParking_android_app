import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {API_URL} from '@env';
import {UseGetAllPost} from '../../hooks/getAllPostQuery';
import {COLORS, EZStatusBar, SPACING} from '../../assets/styles/styles';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import EZInput from '../../components/core/EZInput';

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {data, isLoading} = UseGetAllPost();
  if (isLoading) {
    return <Text>Is loading...</Text>;
  }
  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      <EZInput
        placeholder="Input name"
        onChangeText={newText => {
          console.log(newText);
        }}
        label="Input your name"
        styleFocus={{borderColor: COLORS.primary}}
        iconName="eye"
        handlePressIcon={() => {
          console.log('clmm');
        }}
        errMess="clmmmmmmmmmmm"
      />
      {data.map((post, key) => (
        <View key={key}>
          <EZText>{post.title}</EZText>
          <EZButton title="button" w="30%" type="disabled" icon="user" />
        </View>
      ))}
      <EZStatusBar />
    </EZContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
});
export default Login;
