import {VideoActions, globalAlert} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {_screen_width, formatFFmpegBytes, sizes} from '@utils';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Video} from './component';
import * as RNFS from 'react-native-fs';
import * as ScopedStorage from 'react-native-scoped-storage';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WRITE_FOLDER_KEY} from '@native/permission';
enum STATUS {
  PROCESSING,
  FAILURE,
  SUCCESS,
}
interface Props {}

export const VideoCompress: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_COMPRESS>>();

  const {data, config} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {}, [navigation]);

  const [progressSize, setProgressSize] = useState<number>(0);
  const [status, setStatus] = useState<STATUS>(STATUS.PROCESSING);
  const [outputUri, setOutputUri] = useState<string>();

  const cancelProgress = () => {
    FFmpegKit.cancel();
  };
  const confirmBack = useCallback(() => {
    cancelProgress();
  }, []);

  const backPress = useCallback(() => {
    globalAlert.show({
      title: 'You want to back, cancel all progress',
      onConfirm: () => {
        confirmBack();
        navigation.goBack();
      },
    });
    console.log('Back pressed');
  }, [confirmBack, navigation]);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backPress]);
  const compressVideo = useCallback(async () => {
    console.log('Start compress video');
    var command;
    var resultPath: string;
    var cachePath: string;
    try {
      cachePath = `file://${
        RNFS.TemporaryDirectoryPath
      }${new Date().getTime()}.mp4`;
      console.log('Cache file', cachePath);
      const resultFolder = await AsyncStorage.getItem(WRITE_FOLDER_KEY);
      console.log('result folder', resultFolder);
      if (!resultFolder) {
        return;
      }
      const resultFile = await ScopedStorage.createFile(
        resultFolder,
        'test_' + new Date().getTime(),
        'video/mp4',
      );
      resultPath = resultFile.uri;
      console.log('result path', resultFile);
      command = `-i "${data.data}" -vf scale=${config.width}:${config.height} -y ${cachePath}`;
      console.log('Command: ', command);
    } catch (error) {
      console.log('Prepare file error: ', error);
      return;
    }

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
            console.log('Copy file from ', cachePath, ' to  ', resultPath);
            await ScopedStorage.copyFile(cachePath, resultPath, () => {});
            console.log('Delete temp file', await RNFS.stat(cachePath));
            await RNFS.unlink(cachePath);
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
          setStatus(STATUS.FAILURE);
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
    console.log('Call use effect compress video');
    compressVideo();
  }, [compressVideo]);

  useEffect(() => {
    if (status === STATUS.SUCCESS && outputUri) {
    }
  }, [navigation, outputUri, status]);

  const viewVideo = useCallback(
    (uri: string) => {
      navigation.navigate(APP_SCREEN.VIDEO_PLAY, {
        uri,
      });
    },
    [navigation],
  );

  const goHome = useCallback(() => {
    navigation.navigate(APP_SCREEN.HOME);
  }, [navigation]);

  const tryAgain = useCallback(() => {
    setProgressSize(0);
    setStatus(STATUS.PROCESSING);
    setOutputUri(undefined);
    compressVideo();
  }, [compressVideo]);

  console.log('Çompressing: ', progressSize, data.size);
  const progress = progressSize / data.size;
  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back"
        size={sizes._35sdp}
        color={colors.white}
        style={{marginVertical: sizes._10sdp}}
        onPress={backPress}
      />
      <View style={styles.row}>
        <Video data={data} original />
        <View style={styles.loadingView}>
          <Icon name="arrow-forward" size={sizes._50sdp} color={'#4a9ae4'} />
        </View>
        <Video
          data={{
            ...data,
            resolution: `${config.width}x${config.height}`,
          }}
        />
      </View>
      {status === STATUS.PROCESSING ? (
        <Progress.Bar
          progress={progress}
          width={_screen_width - sizes._90sdp}
          style={styles.progress}
          color="#4a9ae4"
        />
      ) : status === STATUS.SUCCESS ? (
        <View style={styles.body}>
          <View style={styles.completeView}>
            <Icon
              name="check-circle"
              size={sizes._25sdp}
              color={colors.white}
            />
            <Text style={styles.completeText}>Completed</Text>
          </View>
          {outputUri && (
            <TouchableOpacity onPress={() => viewVideo(outputUri)}>
              <Text style={styles.compressUri}>{outputUri}</Text>
            </TouchableOpacity>
          )}
          <VideoActions data={data} />
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.btnView} onPress={goHome}>
            <Text style={styles.btnLabel}>Compress more</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.errorView}>
          <Text style={styles.errorLabel}>Compress error, pls try again</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.btnView} onPress={tryAgain}>
            <Text style={styles.btnLabel}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a1e',
    padding: sizes._15sdp,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: sizes._30sdp,
  },
  loadingView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {
    marginVertical: sizes._30sdp,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  completeView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: sizes._30sdp,
    alignItems: 'center',
  },
  completeText: {
    color: colors.white,
    marginLeft: sizes._8sdp,
    fontWeight: '600',
    fontSize: sizes._20sdp,
  },
  compressUri: {
    color: colors.caption,
    marginTop: sizes._8sdp,
    fontWeight: '500',
    fontSize: sizes._16sdp,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  btnView: {
    paddingVertical: sizes._15sdp,
    backgroundColor: '#4a9ae4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    fontSize: sizes._20sdp,
    fontWeight: '500',
    color: colors.white,
  },
  errorView: {
    flex: 1,
    flexDirection: 'column',
  },
  errorLabel: {
    fontSize: sizes._16sdp,
    color: colors.white,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: sizes._20sdp,
  },
});
