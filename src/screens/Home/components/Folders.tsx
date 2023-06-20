import {VideoGroupEntity} from '@model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Folder} from './Folder';
import {Videos} from './Videos';

interface Props {
  data: VideoGroupEntity[];
}
export const Folders: FC<Props> = ({data}) => {
  const [folder, setFolder] = useState<VideoGroupEntity | undefined>(undefined);
  return (
    <>
      {folder ? (
        <>
          <TouchableOpacity
            style={styles.folderHeader}
            onPress={() => setFolder(undefined)}>
            <Icon name="arrow-back" size={sizes._25sdp} color={colors.white} />
            <Text style={styles.folderTitle}>{folder.name}</Text>
            <View style={{width: sizes._25sdp}} />
          </TouchableOpacity>
          <Videos data={folder.videos} />
        </>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item: VideoGroupEntity, index: number) => index + ''}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Folder data={item} onPress={() => setFolder(item)} />
          )}
          ListFooterComponent={() => <View style={{height: sizes._20sdp}} />}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  folderHeader: {
    flexDirection: 'row',
    marginHorizontal: sizes._30sdp,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes._15sdp,
  },
  folderTitle: {
    fontWeight: '600',
    fontSize: sizes._18sdp,
    color: colors.white,
  },
});