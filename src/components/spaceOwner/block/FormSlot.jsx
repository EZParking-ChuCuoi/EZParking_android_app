import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCreateSlot} from '../../../hooks/api/useSpaceOwnerAction';
import EZText from '../../core/EZText';
import EZInput from '../../core/EZInput';
import {SPACING} from '../../../assets/styles/styles';
import {EZButton} from '../../core/EZButton';
import EZContainer from '../../core/EZContainer';

const FormSlot = ({blockId, refForm, refresh}) => {
  const [params, setParams] = useState({
    slotName: '',
    blockId: blockId,
  });
  const mutationCreate = useCreateSlot();
  const handleCreate = () => {
    if (params.slotName !== '') {
      mutationCreate.mutate(params);
    }
  };
  useEffect(() => {
    if (mutationCreate.isError) {
      console.log(mutationCreate?.error?.response?.data);
    }
    if (mutationCreate.isSuccess) {
      console.log(mutationCreate?.data);
      refForm.current.close();
      refresh();
    }
  }, [mutationCreate.status]);
  return (
    <EZContainer
      styleEZContainer={{
        paddingHorizontal: SPACING.pxComponent,
        paddingVertical: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <EZText size="quiteLarge">Create slot</EZText>
      <EZInput
        placeholder="Ex: D8"
        label="Slot name"
        onChangeText={newText => setParams({...params, ['slotName']: newText})}
        defaultValue={params.slotName}
        styleEZInput={{marginBottom: SPACING.mbInputItem}}
      />
      <EZButton title="Create" handlePress={handleCreate} />
    </EZContainer>
  );
};

export default FormSlot;

const styles = StyleSheet.create({});
