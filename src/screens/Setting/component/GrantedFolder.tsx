import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as ScopedStorage from 'react-native-scoped-storage';
interface Props {
  data: ScopedStorage.FileType;
  selected: boolean;
}
export const GrantedFolder: FC<Props> = ({data}) => {
  const {name, uri} = data;
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.uri}>{uri}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    padding: sizes._10sdp,
  },
  name: {
    color: colors.black,
    fontSize: sizes._18sdp,
  },
  uri: {
    color: colors.black,
    fontSize: sizes._18sdp,
  },
});
