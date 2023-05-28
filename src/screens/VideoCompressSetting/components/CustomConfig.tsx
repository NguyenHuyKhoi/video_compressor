import {Video} from '@components';
import {ConfigEntity, VideoEntity} from '@model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
interface Props {
  data: VideoEntity;
  onDone: (config: ConfigEntity) => void;
}
export const CustomConfig: FC<Props> = ({data, onDone}) => {
  const [resolutionQuality, setResolutionQuality] = useState<number>(100);
  const [bitrateQuality, setBitrateQuality] = useState<number>(100);
  const [compressVideo, setCompressVideo] = useState<VideoEntity>(data);

  useEffect(() => {
    setCompressVideo((a: VideoEntity) => ({
      ...a,
      size: Math.floor(
        (((data.size * resolutionQuality) / 100) * bitrateQuality) / 100,
      ),
      width: Math.floor((data.width * resolutionQuality) / 100),
      height: Math.floor((data.height * resolutionQuality) / 100),
      bitrate: Math.floor((data.bitrate * bitrateQuality) / 100),
    }));
  }, [bitrateQuality, resolutionQuality, data]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.videos}>
          <Video data={data} />
          <View style={{width: sizes._30sdp}} />
          <Video data={compressVideo} />
        </View>
        <Text style={[styles.text, {marginTop: sizes._10sdp}]}>
          Độ phân giải video
        </Text>
        <View style={styles.input}>
          <Slider
            onValueChange={values => setResolutionQuality(values[0])}
            value={resolutionQuality}
            minimumValue={10}
            maximumValue={100}
            step={1}
            containerStyle={styles.sliderContainer}
            thumbTintColor={colors.secondary}
            minimumTrackTintColor={colors.secondary}
            maximumTrackTintColor={colors.gray}
          />
          <Text style={styles.text}>{`${resolutionQuality}%`}</Text>
        </View>

        <Text style={styles.text}>Tốc độ bit</Text>
        <View style={styles.input}>
          <Slider
            onValueChange={values => setBitrateQuality(values[0])}
            value={bitrateQuality}
            minimumValue={10}
            maximumValue={100}
            step={1}
            containerStyle={styles.sliderContainer}
            thumbTintColor={colors.secondary}
            minimumTrackTintColor={colors.secondary}
            maximumTrackTintColor={colors.gray}
          />
          <Text style={styles.text}>{`${bitrateQuality}%`}</Text>
        </View>
        <Text style={styles.text}>322kb/s</Text>
      </View>
      <Button
        title={'Nén video'}
        onPress={() =>
          onDone({
            width: compressVideo.width,
            height: compressVideo.height,
            bitrate: compressVideo.bitrate,
          })
        }
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
