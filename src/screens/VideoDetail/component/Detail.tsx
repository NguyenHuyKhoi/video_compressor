import {Text} from '@components';
import {VideoEntity} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {_screen_width, formatBytes, formatDuration, sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  data: VideoEntity;
}
const iconSize = sizes._50sdp;
export const Detail: FC<Props> = ({data}) => {
  const {displayName, size, duration, resolution} = data;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.VIDEO_PLAY>
    >();
  const viewVideo = useCallback(() => {
    navigation.navigate(APP_SCREEN.VIDEO_PLAY, {
      uri: data.uri,
    });
  }, [data, navigation]);
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* <Video
        source={{uri: data.uri}}
        style={styles.video}
        resizeMode="contain"
        paused
      /> */}
      <Image source={{uri: data.uri}} style={styles.video} />
      <View style={styles.shadowLayer} />
      <View style={styles.top}>
        <View style={styles.closeView}>
          <Icon
            name="close"
            size={sizes._16sdp}
            color={colors.text}
            onPress={goBack}
          />
        </View>
        <View style={styles.durationView}>
          <RNText style={styles.duration}>
            {formatDuration(Math.floor(duration / 1000))}
          </RNText>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: _screen_width,
    height: undefined,
    aspectRatio: 1.7,
    flexDirection: 'column',
    padding: sizes._10sdp,
    justifyContent: 'space-between',
    borderRadius: sizes._5sdp,
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    fontWeight: '500',
    color: colors.bright_Gray,
  },
  shadowLayer: {
    height: sizes._60sdp,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
