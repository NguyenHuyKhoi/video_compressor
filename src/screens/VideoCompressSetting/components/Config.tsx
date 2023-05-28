import {ConfigEntity} from '@model';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  data: ConfigEntity;
  onPress: () => void;
}
export const Config: FC<Props> = ({data, onPress}) => {
  const {size, percentage, width, height, standard} = data;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.quality}>{`${percentage}%`}</Text>
      <View style={styles.center}>
        <View style={{flex: 1}} />
        <Text style={styles.dimension}>{`${width}x${height}`}</Text>

        <View style={{flex: 1}}>
          {standard && (
            <View style={styles.standardView}>
              <Text style={styles.standardLabel}>{standard}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.sizeView}>
        <Text style={styles.sizeLabel}>{formatBytes(Math.floor(size))}</Text>
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
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  standardView: {
    paddingVertical: sizes._3sdp,
    borderRadius: sizes._10sdp,
    backgroundColor: colors.secondary + 'AA',
    width: sizes._50sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  standardLabel: {
    color: colors.white,
    fontSize: sizes._12sdp,
    fontWeight: '700',
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
    flex: 1,
  },
  sizeView: {
    paddingVertical: sizes._4sdp,
    width: sizes._65sdp,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: sizes._6sdp,
  },
  sizeLabel: {
    fontWeight: '700',
    color: colors.white,
    fontSize: sizes._12sdp,
  },
});
