import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import EZRBSheet from '../../core/EZRBSheet';
import {COLORS, SPACING} from '../../../assets/styles/styles';
import EZContainer from '../../core/EZContainer';
import EZInput from '../../core/EZInput';
import {VEHICLE_TYPE} from '../../../utils/defaultDataSelection';
import EZText from '../../core/EZText';
import {EZButton} from '../../core/EZButton';
import EZLoading from '../../core/EZLoading';

const FormBlock = ({
  refRBSheet,
  params,
  setParams,
  handleSubmit,
  editForm = false,
  mutation,
}) => {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <EZRBSheet refRBSheet={refRBSheet} height={600}>
      {mutation?.isLoading && <EZLoading />}
      <EZContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: SPACING.pxComponent}}>
          <EZInput
            placeholder="Ex: Khu A"
            label="Name block"
            styleEZInput={{marginVertical: SPACING.mbInputItem}}
            defaultValue={params.nameBlock}
            onChangeText={newText =>
              setParams({...params, ['nameBlock']: newText})
            }
          />
          <EZInput
            placeholder="Ex: 4-16 seats"
            label="Vehicle type"
            editable={false}
            defaultValue={params.carType==='4-16SLOT' ? '4 -16 seats' : '16 - 34 seats'}
            iconName="chevron-down"
            handlePressIcon={() => setIsDisplay(!isDisplay)}
          />
          {VEHICLE_TYPE.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  styles.itemType,
                  {display: isDisplay ? 'flex' : 'none'},
                ]}
                onPress={() => {
                  setParams({...params, ['carType']: item.value});
                  setIsDisplay(!isDisplay);
                }}>
                <EZText color={COLORS.primary}>{item.label}</EZText>
              </Pressable>
            );
          })}
          <EZInput
            placeholder="Ex: Block for 4-16 seats vehicle, high security..."
            label="Block description"
            styleEZInput={{marginBottom: SPACING.mbInputItem}}
            lines={5}
            defaultValue={params.desc}
            onChangeText={newText => setParams({...params, ['desc']: newText})}
          />
          {!editForm && (
            <EZInput
              placeholder="Ex: 10"
              label="Number of slots"
              styleEZInput={{marginBottom: SPACING.mbInputItem}}
              defaultValue={params.numberOfSlot}
              keyboardType="numeric"
              onChangeText={newText =>
                setParams({...params, ['numberOfSlot']: newText})
              }
            />
          )}
          <EZInput
            placeholder="Ex: 15000"
            label="Price per slot"
            styleEZInput={{marginBottom: SPACING.mbInputItem}}
            keyboardType="numeric"
            defaultValue={params.price}
            value={params.price}
            onChangeText={newText => setParams({...params, ['price']: newText})}
          />
          <EZButton title={editForm ? "Update" : "Create"} handlePress={handleSubmit} />
        </ScrollView>
      </EZContainer>
    </EZRBSheet>
  );
};

export default FormBlock;

const styles = StyleSheet.create({
  itemType: {
    paddingVertical: 8,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
