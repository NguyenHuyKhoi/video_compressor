import {VideoEntity} from '@model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  data: VideoEntity;
}
export const VideoInfor: FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.uri}>{data.data}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: sizes._5sdp,
    borderRadius: sizes._4sdp,
    backgroundColor: colors.primary,
  },
  uri: {
    fontSize: sizes._16sdp,
    color: colors.white,
    textAlign: 'center',
  },
});
