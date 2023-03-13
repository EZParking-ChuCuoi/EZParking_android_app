import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useCreateSlot,
  useEditSlot,
  useGetSlotDetail,
} from '../../../hooks/api/useSpaceOwnerAction';
import EZText from '../../core/EZText';
import EZInput from '../../core/EZInput';
import {SPACING} from '../../../assets/styles/styles';
import {EZButton} from '../../core/EZButton';
import EZContainer from '../../core/EZContainer';
import EZLoading from '../../core/EZLoading';

const FormSlot = ({blockId, refForm, refresh, slotItem}) => {
  const [params, setParams] = useState({
    slotName: '',
    blockId: blockId,
  });
  const mutationCreate = useCreateSlot();
  const mutationEdit = useEditSlot();
  useEffect(() => {
    if (mutationEdit.isSuccess) {
      refForm.current.close();
      setParams({});
      refresh();
    }
    if (mutationEdit.isError) {
      console.log(mutationEdit?.error?.response?.data);
    }
  }, [mutationEdit.status]);
  const handleCreate = () => {
    if (params.slotName !== '') {
      mutationCreate.mutate(params);
    }
  };
  const handleEdit = () => {
    if (params.slotName !== '') {
      mutationEdit.mutate({
        idSlot: slotItem.id,
        slotName: params.slotName,
      });
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
      {mutationEdit.isLoading && <EZLoading />}
      <EZText size="quiteLarge">
        {slotItem ? `Edit slot "${slotItem.slotName}"` : 'Create slot'}
      </EZText>
      <EZInput
        placeholder="Ex: D8"
        label="Slot name"
        onChangeText={newText => setParams({...params, ['slotName']: newText})}
        defaultValue={params.slotName}
        styleEZInput={{marginBottom: SPACING.mbInputItem}}
      />
      <EZButton
        title={slotItem ? 'Edit' : 'Create'}
        handlePress={slotItem ? handleEdit : handleCreate}
      />
    </EZContainer>
  );
};

export default FormSlot;

const styles = StyleSheet.create({});
