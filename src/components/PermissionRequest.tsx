import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Button} from './Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title: string;
  caption: string;
  onAllow: () => void;
}

const iconSize = sizes._200sdp;
export const PermissionRequest: FC<Props> = ({title, caption, onAllow}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Icon name="folder-open" size={iconSize * 0.7} color={'#4a9ae4'} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{caption}</Text>
      <Button
        label="Allow"
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
  iconView: {
    width: iconSize,
    height: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: sizes._60sdp,
    borderRadius: iconSize,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  message: {
    marginBottom: sizes._25sdp,
    fontSize: sizes._16sdp,
    fontWeight: '400',
    color: colors.white,
    alignSelf: 'center',
    marginHorizontal: sizes._20sdp,
  },
  allowBtn: {
    backgroundColor: '#4a9ae4',
    marginHorizontal: sizes._20sdp,
    marginTop: sizes._20sdp,
  },
  allowLabel: {
    color: colors.white,
    fontSize: sizes._22sdp,
    fontWeight: '500',
  },
  title: {
    fontSize: sizes._22sdp,
    fontWeight: '500',
    color: colors.white,
    marginBottom: sizes._20sdp,
    alignSelf: 'center',
  },
});
