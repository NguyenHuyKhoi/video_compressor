import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {colors} from '@themes';
import {_screen_height, _screen_width, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
interface Props {}

export const VideoPlay: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_PLAY>>();
  const uri = route.params.uri;

  // const deleteFile = useCallback(() => {
  //   Alert.alert('Delete this video', 'My Alert Msg', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'OK',
  //       onPress: () =>
  //         StorageModule.deleteFile(uri)
  //           .then(() => {
  //             console.log('Delete success');
  //             navigation.replace(APP_SCREEN.HOME);
  //           })
  //           .catch(error => {
  //             console.log('Delete error: ', error);
  //           }),
  //     },
  //   ]);
  // }, [navigation, uri]);

  // const shareVideo = useCallback(() => {
  //   console.log('uri: ', uri);
  //   const shareOptions = {
  //     title: 'Share',
  //     message: '',
  //     url: 'file://' + uri,
  //     type: 'video/mp4',
  //     failOnCancel: false,
  //   };

  //   Share.open(shareOptions)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       err && console.log(err);
  //     });
  // }, [uri]);
  return (
    <View style={styles.container}>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="contain"
        controls={true}
        fullscreen={true}
      />
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
  video: {
    width: _screen_width,
    height: _screen_height,
    backgroundColor: colors.black,
  },
});
