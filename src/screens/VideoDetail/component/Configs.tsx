import {RESOLUTIONS} from '@config';
import {
  ConfigEntity,
  ORIENTATION,
  StandardResolution,
  VideoEntity,
} from '@model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomOption} from './CustomOption';
import {DefineOption} from './DefineOption';
import {IDefaultOption, Option} from './Option';

const defaultOptions: IDefaultOption[] = [
  {
    title: 'small_file_title',
    caption: 'small_file_caption',
    index: 2,
  },
  {
    title: 'medium_file_title',
    caption: 'medium_file_caption',
    index: 1,
  },
  {
    title: 'large_file_title',
    caption: 'large_file_caption',
    index: 0,
  },
  // {
  //   title: 'Small file (High Quality)',
  //   caption: 'Low resolution ($resolution)- High Quality',
  //   index: 2,
  // },
  // {
  //   title: 'Medium file (High Quality)',
  //   caption: 'Medium resolution ($resolution)- High Quality',
  //   index: 1,
  // },
  // {
  //   title: 'Large file (High Quality)',
  //   caption: 'Best resolution ($resolution)- High Quality',
  //   index: 0,
  // },
];
interface Props {
  data: VideoEntity;
  onChange: (value: ConfigEntity) => void;
}
export const Configs: FC<Props> = ({data, onChange}) => {
  const {orientation, width, height} = data;
  const [configs, setConfigs] = useState<ConfigEntity[]>([]);
  const [idx, setIdx] = useState<number | undefined>(undefined);

  const filterResolutions = useCallback(() => {
    const list: ConfigEntity[] = [];
    console.log('REsolutions: ', RESOLUTIONS);
    RESOLUTIONS.forEach((standard: StandardResolution) => {
      const a1 = Math.min(width, height);
      const a2 = Math.max(width, height);
      const b1 = standard.value;
      const b2 = Math.floor((a2 / a1) * b1);
      const bitrate =
        (parseInt(standard.bitrate.replace('M', ''), 10) * 1000000) / 8;
      if (b1 <= a1) {
        list.push({
          width: orientation === ORIENTATION.PORTRAIT ? b1 : b2,
          height: orientation === ORIENTATION.PORTRAIT ? b2 : b1,
          size: (bitrate * data.duration) / 1000,
          resolution: standard,
        });
      }
    });
    setConfigs(list);
  }, [data.duration, height, orientation, width]);
  useEffect(() => {
    filterResolutions();
  }, [data, filterResolutions]);

  const enableOptions = defaultOptions.filter(
    item => configs.length >= item.index + 1,
  );
  console.log('idx : ', idx);
  return (
    <View style={styles.container}>
      {enableOptions.map((item: IDefaultOption, index: number) => (
        <Option
          key={index + ''}
          option={item}
          config={configs[item.index]}
          selected={idx === index}
          onSelect={() => {
            setIdx(index);
            onChange(configs[item.index]);
          }}
        />
      ))}
      {/* <Option
        selected={idx === enableOptions.length}
        contentView={
          <DefineOption
            options={configs}
            onSelect={a => {
              setIdx(enableOptions.length);
              onChange(a);
            }}
          />
        }
      /> */}
      {/* <Option
        contentView={
          <CustomOption
            data={data}
            onSelect={value => {
              setIdx(enableOptions.length + 1);
              onChange(value);
            }}
          />
        }
        selected={idx === enableOptions.length + 1}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignItems: 'flex-start',
        }}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: sizes._1sdp,
    borderColor: colors.white,
    borderRadius: sizes._8sdp,
    margin: sizes._10sdp,
    padding: sizes._12sdp,
  },
});
