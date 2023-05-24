import {BackButton, Header} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProgressBar} from 'react-native-ui-lib';
interface Props {}

export const VideoCompressProcess: FC<Props> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(APP_SCREEN.VIDEO_PLAY, {
        data: {},
      });
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header title="Compressing" headerLeft={<BackButton />} />
      <View style={styles.body}>
        <View style={styles.resultView}>
          <Text style={styles.resultUri}>éwg;wegwegwegweg</Text>
        </View>
        <Text style={styles.processLabel}>Process...</Text>
        <ProgressBar progress={55} fullWidth progressColor={colors.primary} />
        <View style={styles.processView}>
          <Text style={styles.processSize}>4.5/123</Text>
          <Text style={styles.processPercent}>100%</Text>
        </View>
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
  resultView: {
    padding: sizes._10sdp,
    borderRadius: sizes._6sdp,
    backgroundColor: colors.primary,
  },
  resultUri: {
    color: colors.white,
    fontSize: sizes._16sdp,
    fontWeight: '600',
    alignSelf: 'center',
  },
  processLabel: {
    color: colors.black,
    marginVertical: sizes._20sdp,
  },
  processView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: sizes._20sdp,
  },
  processSize: {
    color: colors.black,
    fontSize: sizes._14sdp,
    fontWeight: '500',
  },
  processPercent: {
    color: colors.black,
    fontSize: sizes._14sdp,
    fontWeight: '500',
  },
});
