import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Video} from './component';
enum STATUS {
  PROCESSING,
  FAILURE,
  SUCCESS,
}
interface Props {}

export const VideoCompress: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_COMPRESS>>();

  const {data} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {}, [navigation]);

  const [progressSize, setProgressSize] = useState<number>(0);
  const [status, setStatus] = useState<STATUS>(STATUS.PROCESSING);
  const [outputUri, setOutputUri] = useState<string>();

  // const compressVideo = useCallback(async () => {
  //   const outputPath = 'file://' + RNFS.TemporaryDirectoryPath + '/output.mp4';
  //   const resultPath = await AsyncStorage.getItem('result_uri');
  //   if (!resultPath) {
  //     return;
  //   }
  //   //RNFS.DocumentDirectoryPath + '/test.mp4';
  //   //'/storage/emulated/0/Movies/sample.mp4';
  //   //`${RNFS.CachesDirectoryPath}/video.zscaled.mp4`;
  //   const command = `-i ${data.data} -vf scale=${config.width}:${
  //     config.height
  //   } -b:v ${formatFFmpegBytes(config.bitrate)} -y ${outputPath}`;
  //   console.log('Command: ', command);

  //   FFmpegKit.executeAsync(
  //     command,
  //     async session => {
  //       const returnCode = await session.getReturnCode();
  //       const duration = await session.getDuration();
  //       const failStackTrace = await session.getFailStackTrace();
  //       console.log('COMPRESS_VIDEO: duration : ', duration);
  //       if (failStackTrace) {
  //         console.log('COMPRESS_VIDEO: failStackTrace : ', failStackTrace);
  //       }

  //       if (ReturnCode.isSuccess(returnCode)) {
  //         // SUCCESS
  //         try {
  //           console.log('Copy file from ', outputPath, ' to  ', resultPath);
  //           await ScopedStorage.copyFile(outputPath, resultPath, () => {});
  //           console.log('Delete temp file', await RNFS.stat(outputPath));
  //           await RNFS.unlink(outputPath);
  //           setOutputUri(resultPath);
  //         } catch (error) {
  //           console.log('Error', error);
  //         }
  //         setStatus(STATUS.SUCCESS);
  //       } else if (ReturnCode.isCancel(returnCode)) {
  //         console.log('COMPRESS_VIDEO: CANCEL');
  //         setStatus(STATUS.FAILURE);
  //         // CANCEL
  //       } else {
  //         console.log('COMPRESS_VIDEO: ERROR');
  //         // ERROR
  //       }
  //     },
  //     log => {
  //       // CALLED WHEN SESSION PRINTS LOGS
  //       console.log(log.getMessage());
  //     },
  //     statistics => {
  //       const size = statistics.getSize();
  //       console.log('COMPRESS_VIDEO: SIZE: ', size);
  //       if (size > 0) {
  //         setProgressSize(size);
  //       }
  //       // CALLED WHEN SESSION GENERATES STATISTICS
  //     },
  //   );
  // }, [config, data]);
  // useEffect(() => {
  //   compressVideo();
  // }, [compressVideo]);

  useEffect(() => {
    if (status === STATUS.SUCCESS && outputUri) {
      navigation.replace(APP_SCREEN.VIDEO_PLAY, {
        uri: outputUri,
      });
    }
  }, [navigation, outputUri, status]);

  return (
    <View style={styles.container}>
      <Icon name="arrow-back" size={sizes._25sdp} color={colors.white} />
      <View style={styles.row}>
        <Video data={data} original />
        <View style={styles.loadingView}>
          <Icon name="close" size={sizes._50sdp} color={colors.white} />
        </View>
        <Video data={data} />
      </View>
      <Progress.Bar progress={0.3} width={200} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a1e',
    padding: sizes._15sdp,
  },
  body: {
    margin: sizes._12sdp,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
