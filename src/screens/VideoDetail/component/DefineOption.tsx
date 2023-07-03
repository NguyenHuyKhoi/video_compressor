import {dispatch} from '@common';
import {ConfigEntity} from '@model';
import {setScrollEnable} from '@reducer';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {commonStyle} from './style';
import {Text} from '@components';
import {useTranslation} from 'react-i18next';
interface Props {
  onSelect: (value: ConfigEntity) => void;
  options: ConfigEntity[];
}
export const DefineOption: FC<Props> = ({options, onSelect}) => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const items = options.map((item: ConfigEntity) => ({
    label: item.resolution?.name,
    value: item.resolution?.value,
  }));
  const [value, setValue] = useState<number | undefined>(undefined);

  const onSelectOption = useCallback(
    (a: number) => {
      setValue(a);
      const option = options.find(item => item.resolution?.value === a);
      if (!option) {
        return;
      }
      console.log('onSelect : ', option);
      onSelect(option);
    },
    [onSelect, options],
  );

  return (
    <View style={styles.container}>
      <Text style={[commonStyle.title, {marginLeft: sizes._10sdp}]}>
        {'resolution_select_title'}
      </Text>
      <DropDownPicker
        open={open}
        // eslint-disable-next-line react-native/no-inline-styles
        arrowIconContainerStyle={{
          backgroundColor: colors.white,
          borderColor: 'red',
        }}
        value={value || null}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        containerStyle={{
          width: sizes._100sdp,
        }}
        placeholder={t('select')}
        placeholderStyle={commonStyle.title}
        labelStyle={commonStyle.title}
        textStyle={commonStyle.title}
        listItemContainerStyle={styles.optionView}
        dropDownContainerStyle={{maxHeight: sizes._260sdp}}
        scrollViewProps={{nestedScrollEnabled: true}}
        onOpen={() => dispatch(setScrollEnable(false))}
        onClose={() => dispatch(setScrollEnable(true))}
        onSelectItem={item => {
          console.log('on select item', item);
          onSelectOption(item.value || 0);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes._5sdp,
    justifyContent: 'space-between',
    flex: 1,
  },
  optionView: {
    backgroundColor: colors.black,
  },
});
