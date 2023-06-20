import {ConfigEntity, VideoEntity} from '@model';
import Slider from '@react-native-community/slider';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyle} from './style';
interface Props {
  data: VideoEntity;
  onSelect: (config: ConfigEntity) => void;
}
export const CustomOption: FC<Props> = ({data, onSelect}) => {
  const [percent, setPercent] = useState(100);
  const {width, height} = data;
  return (
    <View style={styles.container}>
      <Text style={commonStyle.title}>Custom Resolution</Text>
      <View style={styles.body}>
        <View style={styles.row1}>
          <Text style={styles.title}>{`Resolution  ${width}x${height}`}</Text>
          <Text style={styles.title}>{`${percent}%`}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          maximumTrackTintColor={colors.border}
          minimumTrackTintColor={'#0163de'}
          thumbTintColor={'#0163de'}
          onValueChange={value => {
            setPercent(value);
            onSelect(null);
          }}
        />
        <View style={styles.row2}>
          <Text style={styles.caption}>Estimated size </Text>
          <Text style={[styles.title, {fontWeight: '500'}]}>{'0.34MB'}</Text>
          <Text style={styles.caption}>{' (7% Compression)'}</Text>
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
