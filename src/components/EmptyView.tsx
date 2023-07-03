import {images} from '@assets';
import {Text} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  title: string;
  caption: string;
}

const iconSize = sizes._200sdp;
export const EmptyView: FC<Props> = ({title, caption}) => {
  return (
    <View style={styles.container}>
      <Image source={images.emtpy} style={styles.image} resizeMode="center" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{caption}</Text>
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
    marginBottom: sizes._50sdp,
  },
  message: {
    marginBottom: sizes._25sdp,
    fontSize: sizes._16sdp,
    fontWeight: '400',
    color: colors.white,
    alignSelf: 'center',
    marginHorizontal: sizes._20sdp,
    lineHeight: sizes._25sdp,
  },
  title: {
    fontSize: sizes._22sdp,
    fontWeight: '500',
    color: colors.white,
    marginBottom: sizes._20sdp,
    alignSelf: 'center',
    marginHorizontal: sizes._50sdp,
  },
});
