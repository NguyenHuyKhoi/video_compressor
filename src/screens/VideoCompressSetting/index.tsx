import {BackButton, Header, Tabs, VideoInfor} from '@components';
import {
  MAX_PERCENT_COMPRESS_VIDEO,
  MIN_HEIGHT_VIDEO,
  MIN_PERCENT_COMPRESS_VIDEO,
  MIN_WIDTH_VIDEO,
  STANDARD_WIDTHS,
  STEP_PERCENT_COMPRESS_VIDEO,
} from '@config';
import {
  ConfigEntity,
  ORIENTATION,
  StandardResolution,
  VideoEntity,
} from '@model';
import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {sizes} from '@utils';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Config, CustomConfig} from './components';
interface Props {}

export const VideoCompressSetting: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_TASKS>>();

  const data: VideoEntity = route.params.data;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ['Chất lượng cao', 'Chất lượng thấp', 'Tùy chỉnh'];

  const [highQualityConfigs, setHighQualityConfigs] = useState<ConfigEntity[]>(
    [],
  );
  const [lowQualityConfigs, setLowQualityConfigs] = useState<ConfigEntity[]>(
    [],
  );
  const selectConfig = useCallback(
    (config: ConfigEntity) => {
      navigation.navigate(APP_SCREEN.VIDEO_COMPRESS_PROCESS, {
        config,
        data,
      });
    },
    [data, navigation],
  );

  const genConfigs = useCallback(() => {
    const highQualities: ConfigEntity[] = [];
    var percent = MAX_PERCENT_COMPRESS_VIDEO;
    while (percent >= MIN_PERCENT_COMPRESS_VIDEO) {
      const width = Math.floor((data.width * percent) / 100);
      const height = Math.floor((data.height * percent) / 100);
      if (width < MIN_WIDTH_VIDEO || height < MIN_HEIGHT_VIDEO) {
        break;
      }
      highQualities.push({
        width,
        height,
        bitrate: data.bitrate,
        percentage: percent,
        size: Math.floor((data.size * percent) / 100),
      });
      percent = percent - STEP_PERCENT_COMPRESS_VIDEO;
    }

    STANDARD_WIDTHS.forEach((standard: StandardResolution) => {
      const a1 = Math.min(data.width, data.height);
      const a2 = Math.max(data.width, data.height);
      const b1 = standard.value;
      const b2 = Math.floor((a2 / a1) * b1);
      if (b1 < a1) {
        const p = Math.floor((b1 / a1) * 100);
        highQualities.push({
          width: data.orientation === ORIENTATION.PORTRAIT ? b1 : b2,
          height: data.orientation === ORIENTATION.PORTRAIT ? b2 : b1,
          bitrate: data.bitrate,
          percentage: p,
          size: Math.floor((data.size * p) / 100),
          standard: standard.name,
        });
      }
    });

    highQualities.sort((a, b) =>
      a.percentage && b.percentage && a.percentage < b.percentage ? 1 : -1,
    );
    setHighQualityConfigs(highQualities);
    setLowQualityConfigs(
      highQualities.map((item: ConfigEntity) => ({
        ...item,
        bitrate: item.bitrate / 2,
        size: item.size ? item?.size / 2 : 0,
      })),
    );
  }, [data]);

  useEffect(() => {
    genConfigs();
  }, [data, genConfigs]);

  return (
    <View style={styles.container}>
      <Header title="Chất lượng nén" headerLeft={<BackButton />} />
      <Tabs
        selectedTab={selectedTab}
        tabs={tabs}
        onSelectTab={number => {
          setSelectedTab(number);
          console.log('select : ', number);
        }}
      />
      <View style={styles.body}>
        <VideoInfor data={data} />
        {selectedTab === 0 ? (
          <FlatList
            data={highQualityConfigs}
            style={styles.configs}
            keyExtractor={(item: ConfigEntity, index: number) => index + ''}
            renderItem={({item}) => (
              <Config data={item} onPress={() => selectConfig(item)} />
            )}
          />
        ) : selectedTab === 1 ? (
          <FlatList
            data={lowQualityConfigs}
            style={styles.configs}
            keyExtractor={(item: ConfigEntity, index: number) => index + ''}
            renderItem={({item}) => (
              <Config data={item} onPress={() => selectConfig(item)} />
            )}
          />
        ) : (
          <CustomConfig onDone={selectConfig} data={data} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    margin: sizes._8sdp,
    flex: 1,
  },
  configs: {
    marginVertical: sizes._10sdp,
  },
});
