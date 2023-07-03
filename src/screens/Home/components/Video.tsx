import {VideoEntity} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {formatBytes, formatDuration, sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ScopedStorage from 'react-native-scoped-storage';
import {dispatch} from '@common';
import {onDeleteVideo} from '@reducer';
import StorageModule from '@native/storage';
import Toast from 'react-native-toast-message';
import {ToastType, globalAlert, showToast} from '@components';
interface Props {
  data: VideoEntity;
}
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
      .catch(error => {
        console.log('Delete error: ', error);
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
    <TouchableOpacity
      style={styles.container}
      onPress={() => selectVideo(data)}>
      <ImageBackground style={styles.image} source={{uri: base64Thumb}}>
        <View style={styles.timeView}>
          <Text style={styles.time}>
            {formatDuration(Math.floor(duration / 1000))}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.infor}>
        <Text numberOfLines={1} style={styles.title}>
          {displayName}
        </Text>
        <Text style={styles.caption}>{folder}</Text>
        <Text style={styles.caption}>{`${formatBytes(
          size,
        )} ᐧ ${resolution}`}</Text>
      </View>

      <Icon
        name="delete"
        size={sizes._24sdp}
        color={colors.gray}
        style={styles.delete}
        onPress={pressDelete}
      />
    </TouchableOpacity>
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
    bottom: sizes._6sdp,
    right: sizes._6sdp,
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
