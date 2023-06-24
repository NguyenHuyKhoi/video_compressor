import {VideoEntity} from '@model';
import VideoModule from '@native/video';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Videos} from '../Home/components';
import {sizes} from '@utils';
import {colors} from '@themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  VIDEO_FOLDER_NAME,
  WRITE_FOLDER_KEY,
  requestWriteStorage,
} from '@native/permission';
interface Props {}
export const LibraryScreen: FC<Props> = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.HOME>
    >();
  const [videos, setVideos] = useState<VideoEntity[]>([]);
  const [granted, setGranted] = useState<boolean>(false);

  const retrieveVideos = useCallback(async () => {
    const videoFolder = await AsyncStorage.getItem(WRITE_FOLDER_KEY);
    if (!videoFolder) {
      setGranted(false);
      return;
    }
    setGranted(true);
    VideoModule.getVideos(null).then(res => {
      setVideos(
        res.filter((item: VideoEntity) =>
          item.relativePath.includes(VIDEO_FOLDER_NAME),
        ),
      );
    });
  }, []);
  useEffect(() => {
    retrieveVideos();
  }, [retrieveVideos, granted]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const requestWritePermission = useCallback(async () => {
    const granted = await requestWriteStorage();
    if (!granted) {
      Alert.alert('Please granted write permssion');
      return;
    }
    retrieveVideos();
  }, [retrieveVideos]);

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
      {granted ? (
        <View style={styles.videos}>
          <Videos data={videos} />
        </View>
      ) : (
        <>
          <Text style={styles.requestLabel}>
            Please give app permission to save compressed videos{' '}
          </Text>
          <TouchableOpacity
            style={styles.btnView}
            onPress={requestWritePermission}>
            <Text style={styles.btnLabel}>Grant Permission</Text>
          </TouchableOpacity>
        </>
      )}
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
  btnView: {
    paddingVertical: sizes._15sdp,
    backgroundColor: '#4a9ae4',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: sizes._20sdp,
  },
  btnLabel: {
    fontSize: sizes._20sdp,
    fontWeight: '500',
    color: colors.white,
  },
  requestLabel: {
    fontSize: sizes._20sdp,
    color: colors.white,
    margin: sizes._30sdp,
  },
});
