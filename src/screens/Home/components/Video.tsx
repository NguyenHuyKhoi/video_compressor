import {VideoEntity} from '@model';
import {colors} from '@themes';
import {formatBytes, formatDuration, sizes} from '@utils';
import React, {FC} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  data: VideoEntity;
  onPress: () => void;
}
export const Video: FC<Props> = ({data, onPress}) => {
  const {base64Thumb, resolution, size, duration} = data;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground style={styles.image} source={{uri: base64Thumb}}>
        <View style={{flex: 1}} />
        <View style={styles.infor}>
          <Text style={styles.caption}>{resolution}</Text>
          <View style={styles.row2}>
            <Text style={styles.caption}>{formatBytes(size)}</Text>
            <Text style={styles.caption}>
              {formatDuration(Math.floor(duration / 1000))}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: sizes._10sdp,
    marginHorizontal: sizes._5sdp,
    borderRadius: sizes._6sdp,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
  },
  infor: {
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: sizes._5sdp,
    paddingVertical: sizes._2sdp,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: sizes._13sdp,
    fontWeight: '700',
    color: colors.white,
  },
  caption: {
    fontSize: sizes._11sdp,
    fontWeight: '600',
    color: colors.white,
  },
});
