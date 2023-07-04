import {dispatch} from '@common';
import {Text, ToastType, globalAlert, showToast} from '@components';
import {VideoEntity} from '@model';
import StorageModule from '@native/storage';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {onDeleteVideo} from '@reducer';
import {colors} from '@themes';
import {formatBytes, formatDuration, sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Props {
  data: VideoEntity;
}
const iconSize = sizes._24sdp;
export const Video: FC<Props> = ({data}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.VIDEO_DETAIL>
    >();
  const {base64Thumb, resolution, size, displayName, relativePath, duration} =
    data;

  const a = relativePath.split('/');
  a.pop();
  const folder = a.pop();

  const deleteVideo = useCallback(() => {
    StorageModule.deleteFile(data.uri)
      .then(() => {
        dispatch(onDeleteVideo(data.uri));
        showToast(ToastType.SUCCESS, 'delete_video_success');
      })
      .catch(() => {
        showToast(ToastType.WARNING, 'delete_video_failure');
      });
  }, [data]);

  const selectVideo = useCallback(
    (video: VideoEntity) => {
      if (video.size === 0) {
        globalAlert.show({
          title: 'select_video_error_title',
          content: 'select_video_error_content',
          onConfirm: () => deleteVideo(),
        });
        return;
      }
      navigation.navigate(APP_SCREEN.VIDEO_DETAIL, {
        data: video,
      });
    },
    [deleteVideo, navigation],
  );

  const pressDelete = useCallback(() => {
    globalAlert.show({
      title: 'delete_video_title',
      content: 'delete_video_caption',
      onConfirm: deleteVideo,
    });
  }, [deleteVideo]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => selectVideo(data)}>
        <ImageBackground style={styles.image} source={{uri: base64Thumb}}>
          <View style={styles.timeView}>
            <RNText style={styles.time}>
              {formatDuration(Math.floor(duration / 1000))}
            </RNText>
          </View>
          <View style={styles.playView}>
            <Icon
              name="play-arrow"
              size={iconSize * 0.8}
              color={colors.white}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.infor}>
        <Text numberOfLines={1} style={styles.title}>
          {displayName}
        </Text>
        <Text style={styles.caption}>{folder || ''}</Text>
        <Text style={styles.caption}>{`${formatBytes(size)} ᐧ ${
          resolution || ''
        }`}</Text>
      </View>

      <Icon
        name="delete"
        size={sizes._24sdp}
        color={colors.gray}
        style={styles.delete}
        onPress={pressDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    height: sizes._80sdp,
    aspectRatio: 1.5,
    borderRadius: sizes._4sdp,
    overflow: 'hidden',
    position: 'relative',
  },
  playView: {
    width: iconSize,
    height: iconSize,
    borderRadius: sizes._40sdp,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray + 'AA',
    alignSelf: 'center',
    position: 'absolute',
    top: sizes._25sdp,
    left: sizes._45sdp,
  },
  infor: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: sizes._12sdp,
  },
  title: {
    fontSize: sizes._15sdp,
    fontWeight: '700',
    color: colors.white,
    marginBottom: sizes._3sdp,
  },
  caption: {
    fontSize: sizes._12sdp,
    fontWeight: '500',
    marginTop: sizes._3sdp,
    color: '#848484',
  },
  timeView: {
    position: 'absolute',
    bottom: sizes._3sdp,
    right: sizes._3sdp,
    paddingVertical: sizes._2sdp,
    paddingHorizontal: sizes._3sdp,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: sizes._2sdp,
  },
  time: {
    fontSize: sizes._11sdp,
    fontWeight: '600',
    color: colors.white,
  },
  delete: {
    position: 'absolute',
    bottom: sizes._6sdp,
    right: sizes._6sdp,
    padding: sizes._2sdp,
  },
});
