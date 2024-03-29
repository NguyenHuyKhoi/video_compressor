import {VideoGroupEntity} from '@model';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  data: VideoGroupEntity;
  onPress: () => void;
}
export const VideoGroup: FC<Props> = ({data, onPress}) => {
  const {name, size, items} = data;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{`${name} (${items?.length || 0})`}</Text>
      <View style={styles.sizeView}>
        <Text style={styles.sizeLabel}>{formatBytes(size || 0)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: sizes._5sdp,
    borderBottomWidth: sizes._1sdp,
    borderBottomColor: colors.black,
  },
  thumbnail: {
    width: sizes._80sdp,
    height: sizes._80sdp,
  },
  name: {
    flex: 1,
    marginHorizontal: sizes._8sdp,
  },
  sizeView: {
    padding: sizes._3sdp,
    backgroundColor: colors.primary,
    borderRadius: sizes._4sdp,
    minWidth: sizes._60sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeLabel: {
    fontWeight: '700',
    color: colors.white,
    fontSize: sizes._14sdp,
  },
});
