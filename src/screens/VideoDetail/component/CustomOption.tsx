import {ConfigEntity, VideoEntity} from '@model';
import Slider from '@react-native-community/slider';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyle} from './style';
interface Props {
  data: VideoEntity;
  onSelect: (config: ConfigEntity) => void;
}
export const CustomOption: FC<Props> = ({data, onSelect}) => {
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
  return (
    <View style={styles.container}>
      <Text style={commonStyle.title}>Custom Resolution</Text>
      <View style={styles.body}>
        <View style={styles.row1}>
          <Text
            style={
              styles.title
            }>{`Resolution  ${config?.width}x${config?.height}`}</Text>
          <Text style={styles.title}>{`${percent}%`}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={100}
          step={5}
          value={percent}
          maximumTrackTintColor={colors.border}
          minimumTrackTintColor={'#0163de'}
          thumbTintColor={'#0163de'}
          onValueChange={onChange}
        />
        <View style={styles.row2}>
          <Text style={styles.caption}>Estimated size </Text>
          <Text style={[styles.title]}>{formatBytes(config?.size || 0)}</Text>
          <Text style={styles.caption}>{` (${Math.floor(
            (reduceSize / data.size) * 100,
          )}% Compression)`}</Text>
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
