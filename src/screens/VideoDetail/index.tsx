import {useSelector} from '@common';
import {Button, globalAlert} from '@components';
import {ConfigEntity} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {VIDEO_FOLDER_NAME, sizes} from '@utils';
import React, {FC, useCallback, useState} from 'react';
import {Linking, ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {
  FileType,
  listFiles,
  openDocumentTree,
  getPersistedUriPermissions,
  createDirectory,
} from 'react-native-scoped-storage';
import {Configs, Detail} from './component';
interface Props {}

export const VideoDetail: FC<Props> = ({}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.VIDEO_DETAIL>
    >();
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_DETAIL>>();
  const [config, setConfig] = useState<ConfigEntity | undefined>(undefined);
  const {scrollEnable} = useSelector(x => x.view);
  const data = route.params.data;

  const navigateToCompress = useCallback(
    (folder_uri: string) => {
      if (!config) {
        return;
      }

      navigation.navigate(APP_SCREEN.VIDEO_COMPRESS, {
        data,
        config,
        folder_uri,
      });
    },
    [config, data, navigation],
  );

  const getWriteFolder = useCallback(async () => {
    const sdk = await DeviceInfo.getApiLevel();
    if (sdk < 30) {
      const writeFolder =
        `${RNFS.ExternalDirectoryPath}/DCIM/` + VIDEO_FOLDER_NAME;
      const isExist = await RNFS.exists(writeFolder);
      if (isExist) {
        return writeFolder;
      }
      await RNFS.mkdir(writeFolder);
      return writeFolder;
    } else {
    }
  }, []);

  const handleWritePermission = useCallback(
    async (from_background: boolean = false) => {
      const sdk = await DeviceInfo.getApiLevel();
      if (sdk < 30) {
        const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          const folder_uri = await getWriteFolder();
          if (folder_uri) {
            navigateToCompress(folder_uri);
          }
          return true;
        }
        if (result === RESULTS.DENIED) {
          await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
          handleWritePermission();
          return;
        }
        if (result === RESULTS.BLOCKED) {
          globalAlert.show({
            title: 'video_read_permission_title',
            content: 'video_read_permission_caption',
            confirmLabel: 'video_read_permission_btn',
            onConfirm: () => Linking.openSettings(),
          });
        }
      } else if (!from_background) {
        try {
          const uris = await getPersistedUriPermissions();
          var parentUri;
          if (uris.length === 0) {
            parentUri = (await openDocumentTree(true)).uri;
          } else {
            parentUri = uris[0];
          }

          var subFolders: FileType[] = await listFiles(parentUri);
          var targetUri = subFolders.find(
            (folder: FileType) => folder.name === VIDEO_FOLDER_NAME,
          )?.uri;
          if (!targetUri) {
            targetUri = (await createDirectory(parentUri, VIDEO_FOLDER_NAME))
              .uri;
          }

          navigateToCompress(targetUri);
          return;
        } catch (error) {}
      }
    },
    [getWriteFolder, navigateToCompress],
  );

  const enableBtn = config !== undefined;

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={scrollEnable}
        style={styles.body}
        showsVerticalScrollIndicator={false}>
        <Detail data={data} />
        <Configs data={data} onChange={setConfig} />
      </ScrollView>
      <Button
        label={enableBtn ? 'compress_button_title' : 'compress_btn_disable'}
        labelStyle={styles.btnLabel as ViewStyle}
        onPress={enableBtn ? () => handleWritePermission() : undefined}
        style={
          [
            styles.btnView,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: enableBtn ? '#4a9ae4' : colors.nickel,
            },
          ] as ViewStyle
        }
      />
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
  },
  btnView: {
    paddingVertical: sizes._15sdp,
    backgroundColor: '#4a9ae4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._2sdp,
  },
  btnLabel: {
    fontSize: sizes._20sdp,
    fontWeight: '500',
    color: colors.white,
  },
});
