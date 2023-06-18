import {VideoEntity} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {_screen_width, formatBytes, formatDuration, sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  data: VideoEntity;
}
const iconSize = sizes._50sdp;
export const Detail: FC<Props> = ({data}) => {
  const {base64Thumb, displayName, size, duration, resolution} = data;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.VIDEO_PLAY>
    >();
  const viewVideo = useCallback(() => {
    navigation.navigate(APP_SCREEN.VIDEO_PLAY, {
      uri: data.uri,
    });
  }, [data, navigation]);
  return (
    <ImageBackground source={{uri: base64Thumb}} style={styles.thumbnail}>
      <LinearGradient
        style={styles.shadowLayer}
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
        locations={[0, 1]}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
      />
      <View style={styles.top}>
        <View style={styles.closeView}>
          <Icon name="close" size={sizes._16sdp} color={colors.text} />
        </View>
        <View style={styles.durationView}>
          <Text style={styles.duration}>
            {formatDuration(Math.floor(duration / 1000))}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.playView} onPress={viewVideo}>
        <Icon name="play-arrow" size={iconSize * 0.8} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text style={styles.title}>{displayName}</Text>
        <Text style={styles.caption}>{`${resolution} | ${formatBytes(
          size,
        )}`}</Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    width: _screen_width,
    height: undefined,
    aspectRatio: 1.7,
    flexDirection: 'column',
    padding: sizes._10sdp,
    justifyContent: 'space-between',
  },
  playView: {
    width: iconSize,
    height: iconSize,
    borderRadius: sizes._40sdp,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray + 'AA',
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeView: {
    width: sizes._22sdp,
    height: sizes._22sdp,
    borderRadius: sizes._20sdp,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationView: {
    paddingVertical: sizes._3sdp,
    paddingHorizontal: sizes._8sdp,
    backgroundColor: colors.black + 'AA',
    borderRadius: sizes._3sdp,
  },
  duration: {
    fontSize: sizes._14sdp,
    fontWeight: '700',
    color: colors.white,
  },
  bottom: {
    flexDirection: 'column',
  },
  row2: {
    flexDirection: 'row',
    marginTop: sizes._5sdp,
  },
  title: {
    fontSize: sizes._18sdp,
    fontWeight: '600',
    color: colors.white,
  },
  caption: {
    fontSize: sizes._14sdp,
    fontWeight: '400',
    color: colors.border,
  },
  shadowLayer: {
    height: sizes._60sdp,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
