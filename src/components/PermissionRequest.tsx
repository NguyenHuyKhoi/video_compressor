import {images} from '@assets';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {Button} from './Button';
import {Text} from '@components';

interface Props {
  title: string;
  caption: string;
  onAllow: () => void;
}

const iconSize = sizes._150sdp;
export const PermissionRequest: FC<Props> = ({title, caption, onAllow}) => {
  return (
    <View style={styles.container}>
      <Image source={images.folder} style={styles.image} resizeMode="center" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{caption}</Text>
      <Button
        label="open_setting"
        labelStyle={styles.allowLabel as ViewStyle}
        onPress={onAllow}
        style={styles.allowBtn as ViewStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    width: iconSize,
    height: iconSize,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: sizes._60sdp,
  },
  message: {
    marginBottom: sizes._25sdp,
    fontSize: sizes._16sdp,
    fontWeight: '400',
    color: colors.white,
    alignSelf: 'center',
    marginHorizontal: sizes._20sdp,
    lineHeight: sizes._24sdp,
  },
  allowBtn: {
    backgroundColor: '#4a9ae4',
    marginHorizontal: sizes._20sdp,
    marginTop: sizes._20sdp,
  },
  allowLabel: {
    color: colors.white,
    fontSize: sizes._18sdp,
    fontWeight: '500',
  },
  title: {
    fontSize: sizes._22sdp,
    fontWeight: '500',
    color: colors.white,
    marginBottom: sizes._12sdp,
    alignSelf: 'center',
  },
});
