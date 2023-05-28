import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  title: string;
  headerRight?: JSX.Element;
  headerLeft?: JSX.Element;
}
export const Header: FC<Props> = ({title, headerRight, headerLeft}) => {
  return (
    <View style={styles.container}>
      {headerLeft}
      <Text style={styles.title}>{title}</Text>
      {headerRight}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: sizes._20sdp,
    paddingHorizontal: sizes._15sdp,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: sizes._18sdp,
    color: colors.white,
    fontWeight: '700',
  },
});
