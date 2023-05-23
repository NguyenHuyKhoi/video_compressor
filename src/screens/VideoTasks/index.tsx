import {BackButton, Header, Video, VideoInfor} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import data from '../../redux/data.json';
import {Task} from './components';
const sampleVideo = data[0].items[0];
interface Props {}

export const VideoTasks: FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <Header title="Video Setting" headerLeft={<BackButton />} />
      <View style={styles.body}>
        <VideoInfor />
        <View style={styles.content}>
          <View style={styles.tasks}>
            {[1, 2, 3, 4, 5].map(item => (
              <Task style={styles.task} />
            ))}
          </View>
          <Video data={sampleVideo} />
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
