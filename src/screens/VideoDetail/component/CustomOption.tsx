import {ConfigEntity, VideoEntity} from '@model';
import Slider from '@react-native-community/slider';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {commonStyle} from './style';
import {Text} from '@components';
import {useTranslation} from 'react-i18next';
interface Props {
  data: VideoEntity;
  onSelect: (config: ConfigEntity) => void;
}
export const CustomOption: FC<Props> = ({data, onSelect}) => {
  const {t} = useTranslation();
  const [percent, setPercent] = useState<number>(100);
  const [config, setConfig] = useState<ConfigEntity | undefined>();

  const onChange = useCallback(
    (value: number) => {
      setPercent(value);

      const newConfig = {
        width: Math.floor((data.width * value) / 100),
        height: Math.floor((data.height * value) / 100),
        size: Math.floor((data.size * value) / 100),
      };
      setConfig(newConfig);
      onSelect(newConfig);
    },
    [data, onSelect],
  );

  const reduceSize = data.size - (config?.size || 0);
  const reducePercent = Math.floor((reduceSize / data.size) * 100);
  const reduceResolution = `${config?.width}x${config?.height}`;
  return (
    <View style={styles.container}>
      <Text style={commonStyle.title}>{'resolution_custom_title'}</Text>
      <View style={styles.body}>
        <View style={styles.row1}>
          <Text params={{resolution: reduceResolution}} style={styles.title}>
            {'compress_resolution'}
          </Text>
          <Text style={styles.title}>{`${percent}%`}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={100}
          step={5}
          value={percent}
          maximumTrackTintColor={colors.nickel}
          minimumTrackTintColor={'#0163de'}
          thumbTintColor={'#0163de'}
          onValueChange={onChange}
        />
        <View style={styles.row2}>
          <Text style={styles.title}>{'compress_size'}</Text>
          <Text style={[styles.title]}>
            {'    ' + formatBytes(config?.size || 0)}
          </Text>
          <Text
            style={[
              styles.caption,
              {
                color: colors.DarkSpringGreen,
                marginLeft: sizes._5sdp,
              },
            ]}
            params={{percent: reducePercent}}>
            {'compress_percent'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: sizes._10sdp,
    flex: 1,
  },
  body: {
    flexDirection: 'column',
    marginLeft: -sizes._30sdp,
    marginTop: sizes._16sdp,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row2: {flexDirection: 'row', alignItems: 'center', marginTop: sizes._3sdp},
  title: {
    fontSize: sizes._15sdp,
    fontWeight: '400',
    color: colors.white,
  },
  caption: {
    fontSize: sizes._12sdp,
    fontWeight: '400',
    color: colors.white,
  },
  slider: {
    width: '100%',
    height: sizes._40sdp,
  },
});
