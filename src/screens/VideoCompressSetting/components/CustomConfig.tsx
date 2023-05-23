import {ConfigEntity} from '@src/model';
import {colors} from '@themes';
import {formatBytes, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Video} from './Video';
import data from '../../../redux/data.json';
import {Slider} from 'react-native-ui-lib';
const sampleVideo = data[0].items[0];
interface Props {
  data: ConfigEntity;
}
export const CustomConfig: FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.videos}>
        <Video data={sampleVideo} />
        <View style={{width: sizes._30sdp}} />
        <Video data={sampleVideo} />
      </View>
      <Text style={[styles.text, {marginTop: sizes._10sdp}]}>Resolution</Text>
      <View style={styles.input}>
        <Slider
          onValueChange={() => {}}
          value={0}
          minimumValue={0}
          maximumValue={100}
          step={1}
          containerStyle={styles.sliderContainer}
        />
        <Text style={styles.text}>100%</Text>
      </View>

      <Text style={styles.text}>Bit rate</Text>
      <View style={styles.input}>
        <Slider
          onValueChange={() => {}}
          value={0}
          minimumValue={0}
          maximumValue={100}
          step={1}
          containerStyle={styles.sliderContainer}
        />
        <Text style={styles.text}>100%</Text>
      </View>
      <Text style={styles.text}>322kb/s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: sizes._10sdp,
    marginVertical: sizes._10sdp,
    backgroundColor: colors.primary + '22',
    borderRadius: sizes._4sdp,
  },
  videos: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  text: {
    fontSize: sizes._16sdp,
    color: colors.black,
  },
  input: {
    marginTop: sizes._8sdp,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
