import {useSelector} from '@common';
import {BackButton, Header} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {FileType, openDocumentTree} from 'react-native-scoped-storage';
import {GrantedFolder} from './component';
interface Props {}

export const Setting: FC<Props> = ({}) => {
  const {folders, selectedFolder} = useSelector(x => x.storage);

  const requestStorage = async () => {
    const uri = await openDocumentTree(true);
    console.log('URI: ', uri);
  };

  return (
    <View style={styles.container}>
      <Header title="Setting" headerLeft={<BackButton />} />
      <View style={styles.body}>
        <Button title="Choose " onPress={requestStorage} />
        {folders.map((folder: FileType) => (
          <GrantedFolder
            data={folder}
            selected={selectedFolder?.uri === folder.uri}
          />
        ))}
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
