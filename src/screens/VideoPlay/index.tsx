import {Button} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {colors} from '@themes';
import {_screen_height, _screen_width, sizes} from '@utils';
import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
interface Props {}
export const VideoPlay: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_PLAY>>();
  const uri = route.params.uri;

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
    backgroundColor: colors.raisinBlack,
  },
  video: {
    width: _screen_width,
    height: _screen_height - sizes._20sdp,
    backgroundColor: colors.black,
  },
});
