import {BackButton, Header, Video, VideoInfor} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Task} from './components';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VideoEntity} from '@src/model';

interface TaskProps {
  label: string;
  navigate_to: APP_SCREEN;
}
const Tasks: TaskProps[] = [
  {
    label: 'Compress',
    navigate_to: APP_SCREEN.VIDEO_COMPRESS_SETTING,
  },
];
interface Props {}

export const VideoTasks: FC<Props> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectTask = useCallback(
    (data: VideoEntity) => {
      navigation.navigate(APP_SCREEN.VIDEO_COMPRESS_SETTING, {
        data,
      });
    },
    [navigation],
  );
  return (
    <View style={styles.container}>
      <Header title="Video Tasks" headerLeft={<BackButton />} />
      <View style={styles.body}>
        <VideoInfor data={undefined} />
        <View style={styles.content}>
          <View style={styles.tasks}>
            {Tasks.map((item: TaskProps) => (
              <Task
                style={styles.task}
                title={item.label}
                onPress={() => selectTask(item)}
              />
            ))}
          </View>
          <Video data={{}} />
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
