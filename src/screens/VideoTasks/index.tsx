import {BackButton, Header, Video, VideoInfor} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Task} from './components';

interface Props {}

export const VideoTasks: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_TASKS>>();

  const {data} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const compressVideo = useCallback(() => {
    navigation.navigate(APP_SCREEN.VIDEO_COMPRESS_SETTING, {
      data,
    });
  }, [data, navigation]);
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
