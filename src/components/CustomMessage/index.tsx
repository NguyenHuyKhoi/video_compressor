import {ToastType} from '../GlobalMessage';
import {sizes, _screen_statusbar_height} from '@utils';
import {
  CloseIcon,
  ErrorToastIcon,
  InfoToastIcon,
  SuccessToastIcon,
  WarningToastIcon,
} from '@assets';
import {colors} from '@themes';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {hideMessage} from 'react-native-flash-message';
import {Text} from '@components';
const THEMES = {
  [ToastType.SUCCESS]: {
    backgroundColor: colors.HoneyDrew,
    borderColor: colors.MaginMint,
    icon: <SuccessToastIcon />,
  },
  [ToastType.ERROR]: {
    backgroundColor: colors.LavenderBlush,
    borderColor: colors.LightRed,
    icon: <ErrorToastIcon />,
  },
  [ToastType.INFO]: {
    backgroundColor: colors.AzureishWhite,
    borderColor: colors.LightSkyBlue,
    icon: <InfoToastIcon />,
  },
  [ToastType.WARNING]: {
    backgroundColor: colors.CosmicLatte,
    borderColor: colors.Crayola,
    icon: <WarningToastIcon />,
  },
};
interface Props {
  message: string;
  type: ToastType;
}
export const CustomMessage: FC<Props> = ({message, type}) => {
  const {backgroundColor, borderColor, icon} = THEMES[type] || {};
  if (THEMES[type] === undefined) {
    return <></>;
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
        },
      ]}>
      {icon}
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={hideMessage}>
        <CloseIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes._10sdp,
    paddingHorizontal: sizes._18sdp,
    alignSelf: 'center',
    position: 'absolute',
    top: _screen_statusbar_height,
    width: sizes._343sdp,
    borderRadius: sizes._2sdp,
    borderWidth: sizes._1sdp,
  },
  message: {
    flex: 1,
    marginHorizontal: sizes._10sdp,
    color: colors.DarkCharcoal,
    fontSize: sizes._14sdp,
    fontWeight: '500',
  },
});
