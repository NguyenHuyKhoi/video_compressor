import {VideoGroupEntity} from '@src/model';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  data: VideoGroupEntity;
}
export const VideoGroup: FC<Props> = ({data}) => {
  const {name, size, items} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: items[0].thumbnail}} style={styles.thumbnail} />
      <Text style={styles.name}>{name}</Text>
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
