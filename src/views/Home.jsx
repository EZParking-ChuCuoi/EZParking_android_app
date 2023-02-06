import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from '../components/core/EZContainer';
import EZText from '../components/core/EZText';
import {UseGetAllPost} from '../hooks/getAllPostQuery';
import {EZButton} from '../components/core/EZButton';
import {COLORS} from '../assets/styles/styles';

const Home = () => {
  const {data, isLoading} = UseGetAllPost();
  if (isLoading) {
    return (
      <EZContainer>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </EZContainer>
    );
  }
  return (
    <EZContainer>
      <EZText>Home</EZText>
      {data &&
        data.map((post, key) => (
          <View key={key}>
            <EZText>{post.title}</EZText>
          </View>
        ))}
    </EZContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});
