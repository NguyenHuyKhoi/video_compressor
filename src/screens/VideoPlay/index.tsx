import {BackButton, Header} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {_screen_width, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
interface Props {}

export const VideoPlay: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_PLAY>>();
  const uri = route.params.uri;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Header title="Phát video" headerLeft={<BackButton />} />
      <View style={styles.body} />
      <Video
        source={{uri}} // Can be a URL or a local file.
        style={styles.video}
        resizeMode="contain"
      />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn}>
          <Icon name="share" size={sizes._25sdp} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="delete" size={sizes._25sdp} color={colors.white} />
        </TouchableOpacity>
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
  video: {
    width: _screen_width,
    height: sizes._280sdp,
    backgroundColor: colors.black,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: sizes._50sdp,
  },
  btn: {
    width: sizes._50sdp,
    height: sizes._50sdp,
    borderRadius: sizes._30sdp,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
