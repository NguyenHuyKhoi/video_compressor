import {ConfigEntity} from '@model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {commonStyle} from './style';
interface Props {
  onSelect?: () => void;
  options: ConfigEntity[];
}
export const DefineOption: FC<Props> = ({options, onSelect}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const items = options.map((item: ConfigEntity) => ({
    label: item.resolution?.name,
    value: item.resolution?.value,
  }));
  console.log('Items: ', items);

  return (
    <View style={styles.container}>
      <Text style={[commonStyle.title, {marginLeft: sizes._10sdp}]}>
        Resolution
      </Text>
      <DropDownPicker
        open={open}
        // eslint-disable-next-line react-native/no-inline-styles
        arrowIconContainerStyle={{
          backgroundColor: colors.white,
          borderColor: 'red',
        }}
        value={value}
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
        placeholder="Select"
        placeholderStyle={commonStyle.title}
        labelStyle={commonStyle.title}
        textStyle={commonStyle.title}
        listItemContainerStyle={styles.optionView}
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
