import {Text} from '@components';
import {VideoEntity} from '@model';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
interface Props {
  data: VideoEntity;
  original?: boolean;
}
export const Video: FC<Props> = ({data, original}) => {
  const {size, resolution} = data;
  return (
    <View style={styles.container}>
      <Text style={styles.type}>
        {original ? 'original_video' : 'compress_video'}
      </Text>
      <Text
        style={[
          styles.size,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color: original ? colors.white : '#4a9ae4',
          },
        ]}>
        {formatBytes(size)}
      </Text>
      <Text style={styles.resolution}>{resolution}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  type: {
    fontWeight: '400',
    fontSize: sizes._15sdp,
    color: colors.white,
  },
  size: {
    fontWeight: '700',
    fontSize: sizes._18sdp,
    color: colors.white,
    marginVertical: sizes._5sdp,
  },
  resolution: {fontWeight: '400', fontSize: sizes._14sdp, color: colors.white},
});
