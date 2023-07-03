import {VideoEntity, VideoGroupEntity} from '@model';
import VideoModule from '@native/video';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {sizes} from '@utils';
import _ from 'lodash';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  AppState,
  BackHandler,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker, {types} from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Videos} from './components';
import {Folders} from './components/Folders';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {EmptyView, PermissionRequest, Text, globalAlert} from '@components';
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
  const [permissionResult, setPermissionResult] = useState<string | undefined>(
    undefined,
  );
  const [videos, setVideos] = useState<VideoEntity[]>([]);
  const [folders, setFolders] = useState<VideoGroupEntity[]>([]);
  const [mode, setMode] = useState<VIEW_MODE>(VIEW_MODE.FOLDER);

  // *************************************
  // Handle back press
  const backPress = useCallback(() => {
    globalAlert.show({
      title: 'exit_app_title',
      onConfirm: () => {
        BackHandler.exitApp();
      },
    });
    console.log('Back pressed');
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigation.isFocused()) {
        return false;
      }
      backPress();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => subscription.remove();
  }, [backPress, navigation]);

  const retrieveVideos = useCallback(() => {
    VideoModule.getVideos(null).then(videos => {
      console.log('Get videos: ', videos);
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

  // ******************************************
  // Handle read permission
  const defineReadPermisison = useCallback(async () => {
    const sdk = await DeviceInfo.getApiLevel();
    const permission =
      sdk < 33
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
    return permission;
  }, []);

  const requestReadPermission = useCallback(
    async (permission: Permission) => {
      console.log('Request permission');
      const result = await request(permission);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        retrieveVideos();
        return;
      }
      setPermissionResult(result);
    },
    [retrieveVideos],
  );

  const checkReadPermission = useCallback(async () => {
    const permission = await defineReadPermisison();
    const result = await check(permission);
    console.log('Check result ', result);
    setPermissionResult(result);
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      retrieveVideos();
      return;
    }
    if (result === RESULTS.DENIED) {
      await requestReadPermission(permission);
    }
  }, [defineReadPermisison, requestReadPermission, retrieveVideos]);

  useEffect(() => {
    checkReadPermission();
  }, [checkReadPermission]);

  // *************************************
  // Handle back to app

  console.log('result', permissionResult);
  const appState = useRef(AppState.currentState);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (permissionResult === RESULTS.DENIED) {
        return;
      }
      checkReadPermission();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [checkReadPermission, navigation, permissionResult]);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('Handle app state change', permissionResult);
        if (permissionResult === RESULTS.DENIED) {
          return;
        }
        checkReadPermission();
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  });

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
      console.log('pickd', pickedItem);

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

  const openSetting = useCallback(() => {
    Linking.openSettings();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{width: sizes._22sdp}} />
        <Text style={styles.appName}>{'app_name'}</Text>
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
        <TouchableOpacity style={styles.pickBtn} onPress={onDirectPick}>
          <Icon name="add-circle" size={sizes._30sdp} color={colors.white} />
          <Text style={styles.pickLabel}>{'select_video'}</Text>
        </TouchableOpacity>
        {permissionResult === RESULTS.GRANTED ||
        permissionResult === RESULTS.LIMITED ? (
          <>
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
                {mode === VIEW_MODE.FOLDER ? 'folders' : 'videos'}
              </Text>

              <Icon
                name={'arrow-drop-down'}
                size={sizes._30sdp}
                color={colors.white}
              />
            </TouchableOpacity>
            {videos.length === 0 ? (
              <EmptyView title="no_video_title" caption="no_video_caption" />
            ) : mode === VIEW_MODE.FOLDER ? (
              <Folders data={folders} />
            ) : (
              <Videos data={videos} />
            )}
          </>
        ) : permissionResult === RESULTS.BLOCKED ||
          permissionResult === RESULTS.UNAVAILABLE ? (
          <PermissionRequest
            title="video_read_permission_title"
            caption="video_read_permission_caption"
            onAllow={() => openSetting()}
          />
        ) : undefined}
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
    borderBottomColor: colors.AzureishWhite,
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
