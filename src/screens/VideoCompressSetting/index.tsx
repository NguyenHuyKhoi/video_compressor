import {BackButton, Header, Tabs, VideoInfor} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ConfigEntity} from '@src/model';
import {sizes} from '@utils';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Config, CustomConfig} from './components';
interface Props {}

export const VideoCompressSetting: FC<Props> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ['High quality', 'Low quality', 'Custom'];

  const selectConfig = useCallback(
    (config: ConfigEntity) => {
      navigation.navigate(APP_SCREEN.VIDEO_COMPRESS_PROCESS, {
        config,
        data: {},
      });
    },
    [navigation],
  );
  return (
    <View style={styles.container}>
      <Header title="Compress Setting" headerLeft={<BackButton />} />
      <Tabs
        selectedTab={selectedTab}
        tabs={tabs}
        onSelectTab={number => {
          setSelectedTab(number);
          console.log('select : ', number);
        }}
      />
      <View style={styles.body}>
        <VideoInfor />
        {selectedTab === 0 || selectedTab === 1 ? (
          <FlatList
            data={[1, 2, 3, 4]}
            style={styles.configs}
            keyExtractor={(item: ConfigEntity, index: number) => index + ''}
            renderItem={({item}) => (
              <Config data={item} onPress={() => selectConfig(item)} />
            )}
          />
        ) : (
          <CustomConfig onDone={selectConfig} />
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
  },
  configs: {
    marginTop: sizes._10sdp,
  },
});
