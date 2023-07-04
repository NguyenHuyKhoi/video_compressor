import {VideoGroupEntity} from '@model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Folder} from './Folder';
import {Videos} from './Videos';
import {useSelector} from '@common';
import {Text} from '@components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {APP_SCREEN, RootStackParamList} from '@navigation';

interface Props {
  data: VideoGroupEntity[];
}
export const Folders: FC<Props> = ({data}) => {
  const [folder, setFolder] = useState<VideoGroupEntity | undefined>(undefined);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.HOME>
    >();
  const {deleted_uris} = useSelector(x => x.video);
  useEffect(() => {
    if (folder) {
      const displayVideos = folder.videos.filter(
        item => !deleted_uris.find(uri => item.uri === uri),
      );
      if (displayVideos.length === 0) {
        setFolder(undefined);
      }
    }
  }, [deleted_uris, folder]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //  setFolder(undefined);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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
