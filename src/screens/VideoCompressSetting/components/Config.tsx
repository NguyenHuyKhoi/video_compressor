import {ConfigEntity} from '@src/model';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  data: ConfigEntity;
  onPress: () => void;
}
export const Config: FC<Props> = ({onPress}) => {
  const {size, percentage, width, height} = {
    size: 10000,
    percentage: 30,
    width: 1920,
    height: 1080,
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.quality}>{`${percentage}%`}</Text>
      <Text style={styles.dimension}>{`${width}x${height}`}</Text>
      <View style={styles.sizeView}>
        <Text style={styles.sizeLabel}>{formatBytes(size)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary + '22',
    borderRadius: sizes._4sdp,
    padding: sizes._10sdp,
    marginBottom: sizes._10sdp,
  },
  quality: {
    color: colors.black,
    fontWeight: '500',
    fontSize: sizes._16sdp,
  },
  dimension: {
    color: colors.black,
    fontWeight: '500',
    fontSize: sizes._16sdp,
  },
  sizeView: {
    paddingVertical: sizes._4sdp,
    paddingHorizontal: sizes._6sdp,
    backgroundColor: colors.secondary,
    borderRadius: sizes._10sdp,
  },
  sizeLabel: {
    fontWeight: '700',
    color: colors.white,
    fontSize: sizes._12sdp,
  },
});
