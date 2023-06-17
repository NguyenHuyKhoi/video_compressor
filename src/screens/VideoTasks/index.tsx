import {BackButton, Header, Video, VideoInfor} from '@components';
import StorageModule from '@native/storage';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import * as ScopedStorage from 'react-native-scoped-storage';
import Share from 'react-native-share';
import {Task} from './components';
interface Props {}

export const VideoTasks: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_TASKS>>();
  const {data} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const compressVideo = useCallback(async () => {
    try {
      let dir = await ScopedStorage.openDocumentTree(true);
      let videoFile = await ScopedStorage.createFile(
        dir.uri,
        new Date().getTime() + '.mp4',
        'video/mp4',
      );
      AsyncStorage.setItem('result_uri', videoFile.uri);
      navigation.navigate(APP_SCREEN.VIDEO_COMPRESS_SETTING, {
        data,
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [data, navigation]);

  const playVideo = useCallback(() => {
    navigation.navigate(APP_SCREEN.VIDEO_PLAY, {
      uri: data.data,
    });
  }, [data, navigation]);

  const deleteVideo = useCallback(() => {
    Alert.alert('Delete this video', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          StorageModule.deleteFile(data.uri)
            .then(() => {
              console.log('Delete success');
              navigation.replace(APP_SCREEN.HOME);
            })
            .catch(error => {
              console.log('Delete error: ', error);
            }),
      },
    ]);
  }, [data.uri, navigation]);

  const shareVideo = useCallback(() => {
    console.log('share video: ', data);
    const shareOptions = {
      title: 'Share',
      message: '',
      url: 'file://' + data.data,
      type: 'video/mp4',
      failOnCancel: false,
    };

    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }, [data]);
  return (
    <View style={styles.container}>
      <Header title="Chọn tác vụ" headerLeft={<BackButton />} />
      <View style={styles.body}>
        <VideoInfor data={data} />
        <View style={styles.content}>
          <View style={styles.tasks}>
            <Task
              style={styles.task}
              title={'Nén video'}
              onPress={compressVideo}
            />
            <Task
              style={styles.task}
              title={'Phát video'}
              onPress={playVideo}
            />
            <Task
              style={styles.task}
              title={'Chia sẻ video'}
              onPress={shareVideo}
            />
            <Task
              style={styles.task}
              title={'Xóa video'}
              onPress={deleteVideo}
            />
          </View>
          <Video data={data} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    margin: sizes._8sdp,
  },
  content: {
    flexDirection: 'row',
    marginVertical: sizes._12sdp,
  },
  tasks: {
    flex: 1,
    marginRight: sizes._12sdp,
  },
  task: {
    marginBottom: sizes._10sdp,
  },
});
