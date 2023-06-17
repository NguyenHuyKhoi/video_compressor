import {Header, Tabs} from '@components';
import {refreshGrantedFolders} from '@middleware';
import {VideoGroupEntity} from '@model';
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
  Button,
  FlatList,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker, {types} from 'react-native-document-picker';
import {PERMISSIONS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {VideoGroup} from './components';
import {groupVideo} from './utils';
interface HomeProps {}
const tabs = ['Video', 'Image'];
export const Home: FC<HomeProps> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const appState = useRef(AppState.currentState);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshGrantedFolders();
    });

    return unsubscribe;
  }, [navigation]);

  const retriveVideos = useCallback(() => {
    VideoModule.getVideos(null).then(videos => {
      setGroups(groupVideo(videos));
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
  const [groups, setGroups] = useState<VideoGroupEntity[]>([]);
  const openSetting = () => {
    navigation.navigate(APP_SCREEN.SETTING);
  };

  const selectGroup = useCallback(
    (data: VideoGroupEntity) => {
      navigation.navigate(APP_SCREEN.VIDEO_LIST, {
        data,
      });
    },
    [navigation],
  );

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
        type: selectedTab === 0 ? [types.video] : [types.images],
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

  return (
    <View style={styles.container}>
      <Header
        title="Máy nén video"
        headerRight={
          <View style={styles.headerRight}>
            <Icon
              onPress={openSetting}
              name="settings"
              size={sizes._30sdp}
              color={colors.white}
            />
          </View>
        }
      />
      <Tabs
        selectedTab={selectedTab}
        tabs={tabs}
        onSelectTab={number => {
          setSelectedTab(number);
        }}
      />
      <Button title={' Chọn từ thư mục'} onPress={onDirectPick} />

      {selectedTab === 0 ? (
        <FlatList
          data={groups}
          keyExtractor={(item: VideoGroupEntity, index: number) => index + ''}
          renderItem={({item}) => (
            <VideoGroup onPress={() => selectGroup(item)} data={item} />
          )}
        />
      ) : null}
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
