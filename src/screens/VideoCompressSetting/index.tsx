import {BackButton, Header, Tabs, VideoInfor} from '@components';
import {ConfigEntity, VideoCompressConfig} from '@src/model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Config, CustomConfig} from './components';
interface Props {}

export const VideoCompressSetting: FC<Props> = ({}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ['High quality', 'Low quality', 'Custom'];
  return (
    <View style={styles.container}>
      <Header title="Video Setting" headerLeft={<BackButton />} />
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
            renderItem={({item}) => <Config data={item} />}
          />
        ) : (
          <CustomConfig />
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
