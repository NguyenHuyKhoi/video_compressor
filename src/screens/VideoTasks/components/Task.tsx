import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';

interface Props {
  style?: ViewStyle;
}
export const Task: FC<Props> = ({style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Text style={styles.label}>title</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._10sdp,
    backgroundColor: colors.primary + '33',
    borderRadius: sizes._5sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: sizes._18sdp,
    color: colors.black,
    textTransform: 'uppercase',
  },
});
