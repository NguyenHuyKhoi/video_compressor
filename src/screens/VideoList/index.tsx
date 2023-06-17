import {BackButton, Header} from '@components';
import {VideoEntity} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {_getSize, _screen_statusbar_height, sizes} from '@utils';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SortPopup, SortType, SortTypes, Video} from './components';
interface HomeProps {}

export const VideoList: FC<HomeProps> = ({}) => {
  const [modal, setModal] = useState<string | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType>(SortTypes[0]);
  const [list, setList] = useState<VideoEntity[]>([]);
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_LIST>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectVideo = useCallback(
    (data: VideoEntity) => {
      navigation.navigate(APP_SCREEN.VIDEO_TASKS, {
        data,
      });
    },
    [navigation],
  );

  useEffect(() => {
    const temp = route.params.data.items;
    if (temp) {
      temp.sort(sortType.sortFunc);
      setList(temp);
    }
  }, [route.params, sortType]);

  return (
    <View style={styles.container}>
      <Header
        title="Chọn video"
        headerLeft={<BackButton />}
        headerRight={
          <View style={styles.headerRight}>
            <Icon
              name="sort"
              size={sizes._30sdp}
              color={colors.white}
              onPress={() => (modal ? setModal(undefined) : setModal('sort'))}
            />
          </View>
        }
      />
      <FlatList
        data={list}
        numColumns={3}
        keyExtractor={(item: VideoEntity, index: number) => index + ''}
        renderItem={({item}) => (
          <Video data={item} onPress={() => selectVideo(item)} />
        )}
      />
      {modal === 'sort' && (
        <SortPopup
          current={sortType}
          onSelect={a => {
            setSortType(a);
            setModal(undefined);
          }}
          style={styles.menuPopup}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuPopup: {
    position: 'absolute',
    right: sizes._2sdp,
    top: _getSize(_screen_statusbar_height + 45 - 8),
  },
});
