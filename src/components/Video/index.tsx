import {VideoEntity} from '@src/model';
import {colors} from '@themes';
import {_screen_width, formatBytes, formatDuration, sizes} from '@utils';
import React, {FC} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  data: VideoEntity;
  style?: ViewStyle;
  onPress?: () => void;
}
const _margin = sizes._10sdp;
const _size = (_screen_width - _margin * 3) / 3;
export const Video: FC<Props> = ({data, style, onPress}) => {
  const {size, thumbnail, duration} = data;
  return (
    <TouchableOpacity
      disabled={onPress === undefined}
      onPress={onPress}
      style={[styles.container, style]}>
      <ImageBackground source={{uri: thumbnail}} style={styles.thumbnail} />
      <View style={styles.sizeView}>
        <Text style={styles.sizeLabel}>{formatBytes(size)}</Text>
      </View>
      <View style={styles.durationView}>
        <Text style={styles.durationLabel}>{formatDuration(duration)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: _size,
    height: _size,
    position: 'relative',
    marginHorizontal: _margin / 2,
    marginVertical: _margin / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  sizeView: {
    padding: sizes._3sdp,
    backgroundColor: colors.secondary,
    borderRadius: sizes._4sdp,
  },
  sizeLabel: {
    fontWeight: '700',
    color: colors.white,
    fontSize: sizes._12sdp,
  },
  durationView: {
    padding: sizes._3sdp,
    backgroundColor: colors.black + '99',
    borderRadius: sizes._4sdp,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  durationLabel: {
    fontWeight: '700',
    color: colors.white,
    fontSize: sizes._12sdp,
  },
});
