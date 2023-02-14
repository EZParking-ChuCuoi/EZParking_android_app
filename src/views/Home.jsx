import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../components/core/EZContainer';
import EZText from '../components/core/EZText';
import {UseGetAllPost} from '../hooks/getAllPostQuery';
import {EZButton} from '../components/core/EZButton';
import {COLORS} from '../assets/styles/styles';
import {UseGetCountriesCode} from '../hooks/getCountriesCode';
import { getData } from '../shared/asyncStorages';

const Home = () => {
  const {data, isLoading} = UseGetCountriesCode();
  useEffect(() => {
    const getToken = async() => {
      const token = await getData('EZToken');
      console.log('token', token);
    };
    getToken();
  }, []);
  if (isLoading) {
    return (
      <EZContainer>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </EZContainer>
    );
  }

  return (
    <EZContainer>
      <EZText bold>Home</EZText>
      {data &&
        data.map((post, key) => (
          <View key={key}>
            <EZText>{post.countryName}</EZText>
          </View>
        ))}
    </EZContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});
