import {BackButton, Header} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
interface Props {}

export const Setting: FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <Header title="Setting" headerLeft={<BackButton />} />
      <View style={styles.body}>
        <TouchableOpacity style={styles.config}>
          <Text style={styles.label}>Duong dan da luu</Text>
          <Text style={styles.value}>uri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    margin: sizes._12sdp,
  },
  config: {
    flexDirection: 'column',
    marginTop: sizes._10sdp,
  },
  label: {
    color: colors.black,
    fontSize: sizes._16sdp,
    fontWeight: '600',
  },
  value: {
    color: colors.black,
    fontSize: sizes._16sdp,
    fontWeight: '400',
    marginTop: sizes._8sdp,
  },
});
