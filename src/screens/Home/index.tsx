import {Header, Tabs} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import videoGroups from '../../redux/data.json';
import {VideoGroup} from './components';
import {VideoGroupEntity} from '@src/model';
import {Button} from 'react-native-ui-lib';
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ['Video', 'Image'];
  return (
    <View style={styles.container}>
      <Header
        title="Video compressor"
        headerRight={
          <View style={styles.headerRight}>
            <Icon name="more-vert" size={sizes._30sdp} color={colors.white} />
          </View>
        }
      />
      <Tabs
        selectedTab={selectedTab}
        tabs={tabs}
        onSelectTab={number => {
          setSelectedTab(number);
          console.log('select : ', number);
        }}
      />
      <Button
        label={'Select from'}
        size={Button.sizes.large}
        fullWidth
        backgroundColor={colors.gray}
        style={{margin: sizes._10sdp}}
      />
      {selectedTab === 0 ? (
        <FlatList
          data={videoGroups}
          keyExtractor={(item: VideoGroupEntity, index: number) => index + ''}
          renderItem={({item}) => <VideoGroup data={item} />}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
