import {VideoEntity, VideoGroupEntity} from '@model';
import {requestPermission} from '@native/permission';
import VideoModule from '@native/video';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {sizes} from '@utils';
import _ from 'lodash';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
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
import {Videos} from './components';
import {Folders} from './components/Folders';
interface Props {}

enum VIEW_MODE {
  VIDEO,
  FOLDER,
}
export const Home: FC<Props> = ({}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.HOME>
    >();
  const [readGranted, setReadGranted] = useState<boolean>(true);
  const [videos, setVideos] = useState<VideoEntity[]>([]);
  const [folders, setFolders] = useState<VideoGroupEntity[]>([]);
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.FOLDER);
  const appState = useRef(AppState.currentState);

  const retriveVideos = useCallback(() => {
    VideoModule.getVideos(null).then(videos => {
      const groups = _(videos)
        .groupBy('relativePath')
        .map(function (items, path) {
          return {
            name: path
              .split('/')
              .filter(a => a !== '')
              .pop(),
            videos: items,
          };
        })
        .value();
      setVideos(videos);
      console.log('Groups', groups, videos);
      setFolders(groups);
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
      // navigation.navigate(APP_SCREEN.VIDEO_TASKS, {
      //   data,
      // });
    } catch (e) {
      console.log('ERORR:', e);
    }
  };

  const goLibrary = useCallback(() => {
    navigation.navigate(APP_SCREEN.LIBRARY);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{width: sizes._22sdp}} />
        <Text style={styles.appName}>AppName</Text>
        <View style={styles.headerRight}>
          {/* <Icon name="settings" size={sizes._22sdp} color={colors.white} /> */}
          <Icon
            name="local-library"
            size={sizes._22sdp}
            color={colors.white}
            onPress={goLibrary}
          />
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.pickBtn}>
          <Icon name="add-circle" size={sizes._30sdp} color={colors.white} />
          <Text style={styles.pickLabel}>Select video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerList}
          onPress={() =>
            setMode(
              mode === VIEW_MODE.VIDEO ? VIEW_MODE.FOLDER : VIEW_MODE.VIDEO,
            )
          }>
          <Icon
            name={mode === VIEW_MODE.FOLDER ? 'folder' : 'movie'}
            size={sizes._25sdp}
            color={colors.white}
          />
          <Text style={styles.headerListTitle}>
            {mode === VIEW_MODE.FOLDER ? 'Folders' : 'Videos'}
          </Text>
          <Icon
            name={'arrow-drop-down'}
            size={sizes._30sdp}
            color={colors.white}
          />
        </TouchableOpacity>
        {mode === VIEW_MODE.FOLDER ? (
          <Folders data={folders} />
        ) : (
          <Videos data={videos} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a1e',
  },
  body: {
    flex: 1,
    padding: sizes._15sdp,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes._5sdp,
    marginTop: sizes._10sdp,
    marginBottom: sizes._20sdp,
    borderBottomWidth: sizes._1sdp,
    borderBottomColor: colors.gray,
  },
  headerListTitle: {
    fontSize: sizes._20sdp,
    fontWeight: '600',
    color: colors.white,
    flex: 1,
    marginLeft: sizes._10sdp,
  },
  pickBtn: {
    backgroundColor: '#4a9ae4',
    paddingVertical: sizes._6sdp,
    borderRadius: sizes._5sdp,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: sizes._20sdp,
    marginVertical: sizes._6sdp,
  },
  pickLabel: {
    fontWeight: '500',
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
