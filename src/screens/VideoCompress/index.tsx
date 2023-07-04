import {Text, VideoActions, globalAlert} from '@components';
import {ORIENTATION} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {_screen_width, sizes} from '@utils';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {BackHandler, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import * as ScopedStorage from 'react-native-scoped-storage';
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

  const {data, config, folder_uri} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {}, [navigation]);

  const [progressSize, setProgressSize] = useState<number>(0);
  const [status, setStatus] = useState<STATUS>(STATUS.PROCESSING);
  const [outputUri, setOutputUri] = useState<string>();
  const [tempUri, setTempUri] = useState<string>();

  const cancelProgress = () => {
    FFmpegKit.cancel();
  };
  const confirmBack = useCallback(() => {
    cancelProgress();
  }, []);

  const backPress = useCallback(() => {
    globalAlert.show({
      title: 'cancel_compress_video_title',
      onConfirm: () => {
        confirmBack();
        navigation.goBack();
      },
    });
  }, [confirmBack, navigation]);

  useEffect(() => {
    const backAction = () => {
      if (!navigation.isFocused()) {
        return false;
      }
      if (status !== STATUS.PROCESSING) {
        return false;
      }
      confirmBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [confirmBack, navigation, status]);
  const compressVideo = useCallback(async () => {
    var command;
    var resultPath: string;
    var cachePath: string;
    try {
      cachePath = `file://${
        RNFS.TemporaryDirectoryPath
      }${new Date().getTime()}.mp4`;
      const resultFolder = folder_uri;
      if (!resultFolder) {
        return;
      }
      const resultFile = await ScopedStorage.createFile(
        resultFolder,
        data.displayName,
        'video/mp4',
      );
      resultPath = resultFile.uri;

      const w =
        data.orientation === ORIENTATION.LANDSCAPE
          ? config.height
          : config.width;
      const h =
        data.orientation === ORIENTATION.LANDSCAPE
          ? config.width
          : config.height;
      command = `-i "${data.data}" -vf scale=${w}:${h} -b:v ${config.resolution?.bitrate} -y ${cachePath}`;
    } catch (error) {
      return;
    }

    FFmpegKit.executeAsync(
      command,
      async session => {
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();

        if (failStackTrace) {
        }

        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          try {
            await ScopedStorage.copyFile(cachePath, resultPath, () => {});

            await RNFS.unlink(cachePath);
            setTempUri(cachePath);
            setOutputUri(resultPath);
          } catch (error) {}
          setStatus(STATUS.SUCCESS);
        } else if (ReturnCode.isCancel(returnCode)) {
          setStatus(STATUS.FAILURE);
          // CANCEL
        } else {
          setStatus(STATUS.FAILURE);
          // ERROR
        }
      },
      log => {},
      statistics => {
        const size = statistics.getSize();
        if (size > 0) {
          setProgressSize(size);
        }
      },
    );
  }, [config, data, folder_uri]);
  useEffect(() => {
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

  const progress = progressSize / config.size;
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
            size: config.size,
          }}
        />
      </View>
      {status === STATUS.PROCESSING ? (
        <Progress.Bar
          progress={progress}
          width={_screen_width - sizes._50sdp}
          style={styles.progress}
          height={sizes._20sdp}
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
            <Text style={styles.completeText}>completed</Text>
          </View>
          {outputUri && (
            <TouchableOpacity onPress={() => viewVideo(outputUri)}>
              <Text style={styles.compressUri}>{outputUri}</Text>
            </TouchableOpacity>
          )}
          <VideoActions data={data} onDelete={goHome} />
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.btnView} onPress={goHome}>
            <Text style={styles.btnLabel}>compress_more</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.errorView}>
          <Text style={styles.errorLabel}>compress_error</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.btnView} onPress={tryAgain}>
            <Text style={styles.btnLabel}>try_again</Text>
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
    color: '#4a9ae4',
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
    margin: -sizes._15sdp,
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
