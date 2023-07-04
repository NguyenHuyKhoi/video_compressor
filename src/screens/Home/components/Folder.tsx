import {Text} from '@components';
import {VideoGroupEntity} from '@model';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  data: VideoGroupEntity;
  onPress: () => void;
}
export const Folder: FC<Props> = ({data, onPress}) => {
  const {videos, name, app_folder} = data;
  const thumb = videos.length > 0 ? videos[0].base64Thumb : undefined;
  const totalSizes = videos.reduce((s, video) => (s += video.size), 0);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground style={styles.image} source={{uri: thumb}}>
        <View style={{flex: 1}} />
        <View style={styles.thumbRight}>
          <Text style={styles.caption}>{videos.length + ''}</Text>
          <Text style={styles.caption}>videos</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.row2}>
          <Text
            style={[
              styles.caption,
              {
                marginTop: sizes._4sdp,
              },
            ]}>
            {`${formatBytes(totalSizes)}`}
          </Text>
          {app_folder && (
            <View style={styles.appFolderView}>
              <Text style={styles.appFolderLabel}>compress_folder</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: sizes._20sdp,
    marginHorizontal: sizes._5sdp,
  },
  image: {
    height: sizes._72sdp,
    aspectRatio: 1.7,
    borderRadius: sizes._6sdp,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes._2sdp,
  },
  appFolderView: {
    backgroundColor: '#4a9ae4',
    paddingVertical: sizes._1sdp,
    paddingHorizontal: sizes._5sdp,
    borderRadius: sizes._4sdp,
    alignSelf: 'flex-start',
    marginTop: sizes._3sdp,
    marginLeft: sizes._30sdp,
  },
  appFolderLabel: {
    fontWeight: '700',
    fontSize: sizes._10sdp,
    color: colors.white,
  },
  content: {
    flexDirection: 'column',
    borderBottomWidth: sizes._1sdp,
    borderBottomColor: colors.gray,
    marginLeft: sizes._15sdp,
    flex: 1,
  },
  thumbRight: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizes._6sdp,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    marginTop: sizes._8sdp,
    fontSize: sizes._16sdp,
    fontWeight: '400',
    color: colors.white,
  },
  caption: {
    fontSize: sizes._12sdp,
    fontWeight: '400',
    color: colors.white,
  },
});
