import {VideoEntity} from '@model';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {
  data: VideoEntity;
  original?: boolean;
}
export const Video: FC<Props> = ({data, original}) => {
  const {size, resolution} = data;
  return (
    <View style={styles.container}>
      <Text style={styles.type}>{original ? 'Original' : 'Compressed'}</Text>
      <Text style={styles.size}>{size}</Text>
      <Text style={styles.resolution}>{resolution}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  type: {},
  size: {},
  resolution: {},
});
