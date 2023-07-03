import {sizes} from '@utils';
import {colors} from '@themes';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Text} from '@components';

interface Props {
  style?: ViewStyle;
  background?: string;
  onPress?: () => void;
  label: string;
  labelStyle?: ViewStyle;
}
export const Button: FC<Props> = ({
  label,
  background,
  style,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={onPress === undefined}
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: background || colors.CelticBlue},
        style,
      ]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._12sdp,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes._12sdp,
  },
  label: {
    color: colors.white,
    fontSize: sizes._16sdp,
    fontWeight: '500',
  },
});
