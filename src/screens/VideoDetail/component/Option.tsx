import {ConfigEntity, StandardResolution} from '@model';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {commonStyle} from './style';
import {Text} from '@components';

export interface IDefaultOption {
  title: string;
  caption: string;
  index: number;
}
interface IOption {
  option?: IDefaultOption;
  config: ConfigEntity;
  selected?: boolean;
  caption?: string;
  contentView?: JSX.Element;
  onSelect?: () => void;
  style?: ViewStyle;
}
export const Option: FC<IOption> = ({
  option,
  selected,
  contentView,
  config,
  onSelect,
  style,
}) => {
  const {resolution, size} = config;
  return (
    <View style={[styles.container, style]}>
      <Icon
        onPress={() => onSelect && onSelect()}
        name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={sizes._25sdp}
        color={selected ? '#4a9ae4' : '#787878'}
      />
      {contentView ||
        (option ? (
          <TouchableOpacity style={styles.content} onPress={onSelect}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={commonStyle.title}>{option.title}</Text>
                <Text style={commonStyle.title}>
                  {resolution
                    ? ` (${resolution.value} x ${resolution.value2}) `
                    : ''}
                </Text>
              </View>
              <Text
                style={[
                  styles.caption,
                  {color: selected ? '#4a9ae4' : '#787878'},
                ]}>{`${formatBytes(size)}`}</Text>
            </View>
            <Text
              style={[
                styles.caption,
                {color: selected ? '#4a9ae4' : '#787878'},
              ]}>
              {option.caption}
            </Text>
          </TouchableOpacity>
        ) : undefined)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes._10sdp,
  },
  content: {
    flexDirection: 'column',
    marginLeft: sizes._10sdp,
    flex: 1,
  },
  caption: {
    fontSize: sizes._14sdp,
    color: '#787878',
    fontWeight: '500',
    marginTop: sizes._5sdp,
  },
});
