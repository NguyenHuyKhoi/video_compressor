import {BackButton, Header, Video} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VideoEntity} from '@model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface HomeProps {}

export const VideoList: FC<HomeProps> = ({}) => {
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

  const {data} = route.params;
  return (
    <View style={styles.container}>
      <Header
        title="Chọn video"
        headerLeft={<BackButton />}
        headerRight={
          <View style={styles.headerRight}>
            <Icon name="sort" size={sizes._30sdp} color={colors.white} />
          </View>
        }
      />
      <FlatList
        data={data?.items || 0}
        numColumns={3}
        keyExtractor={(item: VideoEntity, index: number) => index + ''}
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
