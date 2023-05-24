import {BackButton, Header, Video} from '@components';
import {VideoEntity, VideoGroupEntity} from '@src/model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import videoGroups from '../../redux/data.json';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
interface HomeProps {}

export const VideoList: FC<HomeProps> = ({}) => {
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
  return (
    <View style={styles.container}>
      <Header
        title="Video List"
        headerLeft={<BackButton />}
        headerRight={
          <View style={styles.headerRight}>
            <Icon name="sort" size={sizes._30sdp} color={colors.white} />
          </View>
        }
      />
      <FlatList
        data={videoGroups[0].items}
        numColumns={3}
        keyExtractor={(item: VideoGroupEntity, index: number) => index + ''}
        renderItem={({item}) => (
          <Video data={item} onPress={() => selectVideo(item)} />
        )}
      />
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
});
