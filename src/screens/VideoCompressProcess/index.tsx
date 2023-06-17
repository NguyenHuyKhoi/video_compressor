import {BackButton, Header} from '@components';
import {requestPermission} from '@native/permission';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {formatBytes, formatFFmpegBytes, sizes} from '@utils';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import * as ScopedStorage from 'react-native-scoped-storage';
enum STATUS {
  PROCESSING,
  FAILURE,
  SUCCESS,
}
interface Props {}

export const VideoCompressProcess: FC<Props> = ({}) => {
  const route =
    useRoute<
      RouteProp<RootStackParamList, APP_SCREEN.VIDEO_COMPRESS_PROCESS>
    >();

  const {data, config} = route.params;
  // {
  //   config: {
  //     width: 1216,
  //     height: 684,
  //     bitrate: 15427974,
  //     percentage: 95,
  //     size: 11064839,
  //   },
  //   data: {
  //     width: 1280,
  //     title: 'VID_20230511_141215',
  //     size: 11647199,
  //     resolution: '1280×720',
  //     relativePath: 'DCIM/Camera/',
  //     uri: 'content://media/external/video/media/1000006141',
  //     height: 720,
  //     duration: 6040,
  //     displayName: 'VID_20230511_141215.mp4',
  //     id: 1000006141,
  //     data: '/storage/emulated/0/DCIM/Camera/VID_20230511_141215.mp4',
  //     orientation: '90',
  //     bitrate: 15427974,
  //   },
  // };

  //
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {}, [navigation]);

  const [progressSize, setProgressSize] = useState<number>(0);
  const [status, setStatus] = useState<STATUS>(STATUS.PROCESSING);
  const [outputUri, setOutputUri] = useState<string>();

  const compressVideo = useCallback(async () => {
    const outputPath = 'file://' + RNFS.TemporaryDirectoryPath + '/output.mp4';
    const resultPath = await AsyncStorage.getItem('result_uri');
    if (!resultPath) {
      return;
    }
    //RNFS.DocumentDirectoryPath + '/test.mp4';
    //'/storage/emulated/0/Movies/sample.mp4';
    //`${RNFS.CachesDirectoryPath}/video.zscaled.mp4`;
    const command = `-i ${data.data} -vf scale=${config.width}:${
      config.height
    } -b:v ${formatFFmpegBytes(config.bitrate)} -y ${outputPath}`;
    console.log('Command: ', command);

    FFmpegKit.executeAsync(
      command,
      async session => {
        const returnCode = await session.getReturnCode();
        const duration = await session.getDuration();
        const failStackTrace = await session.getFailStackTrace();
        console.log('COMPRESS_VIDEO: duration : ', duration);
        if (failStackTrace) {
          console.log('COMPRESS_VIDEO: failStackTrace : ', failStackTrace);
        }

        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          try {
            console.log('Copy file from ', outputPath, ' to  ', resultPath);
            await ScopedStorage.copyFile(outputPath, resultPath, () => {});
            console.log('Delete temp file', await RNFS.stat(outputPath));
            await RNFS.unlink(outputPath);
            setOutputUri(resultPath);
          } catch (error) {
            console.log('Error', error);
          }
          setStatus(STATUS.SUCCESS);
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log('COMPRESS_VIDEO: CANCEL');
          setStatus(STATUS.FAILURE);
          // CANCEL
        } else {
          console.log('COMPRESS_VIDEO: ERROR');
          // ERROR
        }
      },
      log => {
        // CALLED WHEN SESSION PRINTS LOGS
        console.log(log.getMessage());
      },
      statistics => {
        const size = statistics.getSize();
        console.log('COMPRESS_VIDEO: SIZE: ', size);
        if (size > 0) {
          setProgressSize(size);
        }
        // CALLED WHEN SESSION GENERATES STATISTICS
      },
    );
  }, [config, data]);
  useEffect(() => {
    compressVideo();
  }, [compressVideo]);

  useEffect(() => {
    const request = async () => {
      await requestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      await requestPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    };
    request();
  }, []);

  const percent = config.size
    ? Math.floor((progressSize / config.size) * 100)
    : 0;

  useEffect(() => {
    if (status === STATUS.SUCCESS && outputUri) {
      navigation.replace(APP_SCREEN.VIDEO_PLAY, {
        uri: outputUri,
      });
    }
  }, [navigation, outputUri, status]);

  return (
    <View style={styles.container}>
      <Header title="Đang nén" headerLeft={<BackButton />} />
      <View style={styles.body}>
        <View style={styles.resultView}>
          <Text
            style={styles.resultUri}>{`Đường dẫn đã lưu: ${data.uri}`}</Text>
        </View>
        <Text style={styles.processLabel}>Nén...</Text>
        {/* <ProgressBar
          progress={percent}
          fullWidth
          progressColor={colors.primary}
        /> */}
        <View style={styles.processView}>
          <Text style={styles.processSize}>{`${formatBytes(
            progressSize,
          )}/${formatBytes(config.size || 0)}`}</Text>
          <Text style={styles.processPercent}>{`${percent}%`}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    margin: sizes._12sdp,
  },
  resultView: {
    padding: sizes._10sdp,
    borderRadius: sizes._6sdp,
    backgroundColor: colors.primary,
  },
  resultUri: {
    color: colors.white,
    fontSize: sizes._16sdp,
    fontWeight: '600',
    alignSelf: 'center',
  },
  processLabel: {
    color: colors.black,
    marginVertical: sizes._20sdp,
  },
  processView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: sizes._20sdp,
  },
  processSize: {
    color: colors.black,
    fontSize: sizes._14sdp,
    fontWeight: '500',
  },
  processPercent: {
    color: colors.black,
    fontSize: sizes._14sdp,
    fontWeight: '500',
  },
});
