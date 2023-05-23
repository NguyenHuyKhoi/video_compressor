import {BackButton, Header} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Props {}

export const VideoCompressSetting: FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <Header title="Video Setting" headerLeft={<BackButton />} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
