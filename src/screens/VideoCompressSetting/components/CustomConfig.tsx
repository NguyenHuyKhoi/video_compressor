import {Video} from '@components';
import {ConfigEntity} from '@src/model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Slider} from 'react-native-ui-lib';
import data from '../../../redux/data.json';
const sampleVideo = data[0].items[0];
interface Props {
  data: ConfigEntity;
  onDone: (config: ConfigEntity) => void;
}
export const CustomConfig: FC<Props> = ({onDone}) => {
  const [dimensionQuality, setDimensionQuality] = useState(100);
  const [bitrateQuality, setBitrateQuality] = useState(100);
  return (
    <View style={styles.container}>
      <View style={styles.form}>
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
      <Button
        label={'Compress'}
        size={Button.sizes.large}
        backgroundColor={colors.primary + '33'}
        style={{margin: sizes._10sdp}}
        onPress={() => onDone({})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
  form: {
    flexDirection: 'column',
    padding: sizes._10sdp,
    marginVertical: sizes._10sdp,
    backgroundColor: colors.primary + '22',
    borderRadius: sizes._4sdp,
  },
});
