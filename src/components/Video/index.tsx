import {VideoEntity} from '@model';
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
  const {size, base64Thumb, duration, width, height} = data;
  return (
    <TouchableOpacity
      disabled={onPress === undefined}
      onPress={onPress}
      style={[styles.container, style]}>
      <View style={styles.resolutionView}>
        <Text style={styles.resolutionLabel}>{`${width}x${height}`}</Text>
      </View>
      <ImageBackground
        source={{uri: `data:image/jpeg;base64,${base64Thumb}`}}
        style={styles.thumbnail}
      />
      <View style={styles.sizeView}>
        <Text style={styles.sizeLabel}>{formatBytes(size)}</Text>
      </View>
      <View style={styles.durationView}>
        <Text style={styles.durationLabel}>
          {formatDuration(Math.floor(duration / 1000))}
        </Text>
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
  resolutionView: {
    padding: sizes._3sdp,
    backgroundColor: colors.black + '99',
    borderRadius: sizes._4sdp,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  resolutionLabel: {
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
