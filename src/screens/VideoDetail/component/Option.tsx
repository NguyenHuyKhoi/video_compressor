import {StandardResolution} from '@model';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {commonStyle} from './style';

export interface IDefaultOption {
  title: string;
  caption: string;
  index: number;
}
interface IOption {
  option?: IDefaultOption;
  resolution?: StandardResolution;
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
  resolution,
  onSelect,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon
        onPress={() => onSelect && onSelect()}
        name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={sizes._25sdp}
        color={selected ? '#4a9ae4' : '#787878'}
      />
      {contentView || (
        <TouchableOpacity style={styles.content} onPress={onSelect}>
          <Text style={commonStyle.title}>{option?.title}</Text>
          <Text
            style={[styles.caption, {color: selected ? '#4a9ae4' : '#787878'}]}>
            {option?.caption.replace(
              '($resolution)',
              resolution ? `(${resolution.value}x${resolution.value2})` : '',
            )}
          </Text>
        </TouchableOpacity>
      )}
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
