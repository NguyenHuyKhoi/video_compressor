import {VideoEntity} from '@model';
import {requestPermission} from '@native/permission';
import VideoModule from '@native/video';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker, {types} from 'react-native-document-picker';
import {PERMISSIONS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Video} from './components';
interface Props {}
export const Home: FC<Props> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const appState = useRef(AppState.currentState);

  const retriveVideos = useCallback(() => {
    VideoModule.getVideos(null).then(videos => {
      setVideos(videos);
    });
  }, []);
  const handleStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        retriveVideos();
      }

      appState.current = nextAppState;
    },
    [retriveVideos],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleStateChange);

    return () => {
      AppState.removeEventListener('change', handleStateChange);
    };
  }, [handleStateChange]);
  const [readGranted, setReadGranted] = useState<boolean>(true);
  const [videos, setVideos] = useState<VideoEntity[]>([]);
  const openSetting = () => {
    navigation.navigate(APP_SCREEN.SETTING);
  };

  const requestReadStorage = async () => {
    const sdk = await DeviceInfo.getApiLevel();
    setReadGranted(
      await requestPermission(
        sdk < 33
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ),
    );
  };

  useEffect(() => {
    requestReadStorage();
  }, []);

  useEffect(() => {
    if (readGranted) {
      retriveVideos();
    } else {
      Alert.alert('Request read permission', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => Linking.openSettings()},
      ]);
    }
  }, [readGranted, retriveVideos]);

  const onDirectPick = async () => {
    try {
      const pickedItem = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [types.video],
      });
      if (!pickedItem || !pickedItem.fileCopyUri) {
        return;
      }
      console.log('pciekd', pickedItem);

      const videoInfor = await VideoModule.getVideoInfo(pickedItem.uri);

      console.log('Vudeo infor: ', videoInfor);
      const base64Thumb = await VideoModule.createThumbnail(
        pickedItem.fileCopyUri.replace('file://', ''),
      );
      console.log('base 64 thumb: ', base64Thumb);
      const data = {
        ...videoInfor,
        size: pickedItem.size,
        uri: pickedItem.fileCopyUri,
        data: pickedItem.fileCopyUri,
        base64Thumb,
      };
      console.log('Video: ', data);
      navigation.navigate(APP_SCREEN.VIDEO_TASKS, {
        data,
      });
    } catch (e) {
      console.log('ERORR:', e);
    }
  };

  const selectVideo = useCallback(
    (video: VideoEntity) => {
      navigation.navigate(APP_SCREEN.VIDEO_DETAIL, {
        data: video,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{width: sizes._22sdp}} />
        <Text style={styles.appName}>AppName</Text>
        <Icon name="settings" size={sizes._22sdp} color={colors.white} />
      </View>
      <TouchableOpacity style={styles.pickBtn}>
        <Icon name="add-circle" size={sizes._40sdp} color={colors.white} />
        <Text style={styles.pickLabel}>Select video</Text>
      </TouchableOpacity>
      <FlatList
        data={videos}
        keyExtractor={(item: VideoEntity, index: number) => index + ''}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => (
          <Video data={item} onPress={() => selectVideo(item)} />
        )}
        ListFooterComponent={() => <View style={{height: sizes._20sdp}} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a1e',
  },
  pickBtn: {
    backgroundColor: '#4a9ae4',
    paddingVertical: sizes._10sdp,
    borderRadius: sizes._5sdp,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: sizes._20sdp,
    marginVertical: sizes._12sdp,
  },
  pickLabel: {
    fontWeight: '700',
    fontSize: sizes._16sdp,
    color: colors.white,
    marginTop: sizes._4sdp,
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
  appName: {
    fontSize: sizes._18sdp,
    fontWeight: '500',
    color: '#fff',
  },
  list: {
    paddingHorizontal: sizes._5sdp,
    paddingVertical: sizes._10sdp,
  },
});
