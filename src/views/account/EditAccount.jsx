import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZDeveloping from '../../components/core/EZDeveloping';
import {EZButton} from '../../components/core/EZButton';
import {LocalNotification} from '../../shared/LocalPushController';

const EditAccount = () => {
  return (
    <>
      <EZDeveloping title="Edit profile" />
      <EZButton title="push" handlePress={() => LocalNotification('What you know about', 'This is the title', 'This is the message')} />
    </>
  );
};

export default EditAccount;

const styles = StyleSheet.create({});
