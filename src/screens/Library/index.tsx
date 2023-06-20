import {VideoEntity} from '@model';
import VideoModule from '@native/video';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Videos} from '../Home/components';
import {sizes} from '@utils';
import {colors} from '@themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_SCREEN, RootStackParamList} from '@navigation';

interface Props {}
export const LibraryScreen: FC<Props> = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.HOME>
    >();
  const [videos, setVideos] = useState<VideoEntity[]>([]);
  const retrieveVideos = useCallback(() => {
    VideoModule.getVideos(null).then(res => {
      setVideos(res);
    });
  }, []);
  useEffect(() => {
    retrieveVideos();
  }, [retrieveVideos]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={sizes._22sdp}
          color={colors.white}
          onPress={goBack}
        />
        <Text style={styles.headerTitle}>Library</Text>
        <View style={{width: sizes._22sdp}} />
      </View>
      <View style={styles.videos}>
        <Videos data={videos} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes._15sdp,
    paddingHorizontal: sizes._10sdp,
    justifyContent: 'space-between',
    borderBottomColor: colors.border,
    borderBottomWidth: sizes._1sdp,
  },
  headerTitle: {
    fontSize: sizes._18sdp,
    fontWeight: '500',
    color: '#fff',
  },
  videos: {
    flex: 1,
    paddingVertical: sizes._15sdp,
  },
});
