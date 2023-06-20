import {RESOLUTIONS} from '@config';
import {
  ConfigEntity,
  ORIENTATION,
  StandardResolution,
  VideoEntity,
} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IDefaultOption, Option} from './Option';
import {DefineOption} from './DefineOption';
import {CustomOption} from './CustomOption';
import {sizes} from '@utils';
import {colors} from '@themes';

const defaultOptions: IDefaultOption[] = [
  {
    title: 'Small file',
    caption: 'Low resolution ($resolution) - Acceptable Quality',
    index: 2,
  },
  {
    title: 'Medium file',
    caption: 'Medium resolution ($resolution)- Good Quality',
    index: 1,
  },
  {
    title: 'Large file',
    caption: 'Best resolution ($resolution)- Good Quality',
    index: 0,
  },
  {
    title: 'Small file (High Quality)',
    caption: 'Low resolution ($resolution)- High Quality',
    index: 2,
  },
  {
    title: 'Medium file (High Quality)',
    caption: 'Medium resolution ($resolution)- High Quality',
    index: 1,
  },
  {
    title: 'Large file (High Quality)',
    caption: 'Best resolution ($resolution)- High Quality',
    index: 0,
  },
];
interface Props {
  data: VideoEntity;
}
export const Configs: FC<Props> = ({data}) => {
  const {size, orientation, width, height} = data;
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
      if (b1 <= a1) {
        const p = Math.floor((b1 / a1) * 100);
        list.push({
          width: orientation === ORIENTATION.PORTRAIT ? b1 : b2,
          height: orientation === ORIENTATION.PORTRAIT ? b2 : b1,
          size: Math.floor((size * p) / 100),
          resolution: standard,
        });
      }
    });
    setConfigs(list);
  }, [height, orientation, size, width]);
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
          option={item}
          resolution={configs[item.index].resolution}
          selected={idx === index}
          onSelect={() => {
            setIdx(index);
          }}
        />
      ))}
      <Option
        selected={idx === enableOptions.length}
        contentView={
          <DefineOption
            options={configs}
            onSelect={() => {
              setIdx(enableOptions.length);
            }}
          />
        }
      />
      <Option
        contentView={
          <CustomOption
            data={data}
            onSelect={() => {
              setIdx(enableOptions.length + 1);
            }}
          />
        }
        selected={idx === enableOptions.length + 1}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignItems: 'flex-start',
        }}
      />
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
