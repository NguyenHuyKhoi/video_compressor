import {Header, Tabs} from '@components';
import {checkPermission, requestPermission} from '@native/permission';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VideoGroupEntity} from '@model';
import VideoModule from '@native/video';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {VideoGroup} from './components';
import {groupVideo} from './utils';
import DocumentPicker, {types} from 'react-native-document-picker';
interface HomeProps {}
const tabs = ['Video', 'Image'];
export const Home: FC<HomeProps> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [readGranted, setReadGranted] = useState<boolean>(false);
  const [writeGranted, setWriteGranted] = useState<boolean>(false);
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

  useEffect(() => {
    const requestPer = async () => {
      const g1 = await checkPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (!g1) {
        const grantedRequest = await requestPermission(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        setReadGranted(grantedRequest);
      } else {
        setReadGranted(true);
      }

      const g2 = await checkPermission(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      if (!g2) {
        const grantedRequest = await requestPermission(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        setWriteGranted(grantedRequest);
      } else {
        setWriteGranted(true);
      }
    };
    requestPer();
  }, []);

  const retriveVideos = useCallback(() => {
    VideoModule.getVideos(null).then(videos => {
      console.log('get videos: ', videos);
      setGroups(groupVideo(videos));
    });
  }, []);

  useEffect(() => {
    if (readGranted) {
      retriveVideos();
    }
  }, [readGranted, retriveVideos]);

  const onDirectPick = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: selectedTab === 0 ? [types.video] : [types.images],
      });
      if (!pickedFile) {
        return;
      }
      console.log('Picked file: ', pickedFile);
      const resss = await VideoModule.getVideos(pickedFile.uri);
      console.log('Get meta data of picked videos: ', resss);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Header
        title="Video compressor"
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
          console.log('select : ', number);
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
