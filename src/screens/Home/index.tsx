import {Header, Tabs} from '@components';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import videoGroups from '../../redux/data.json';
import {VideoGroup} from './components';
import {VideoGroupEntity} from '@src/model';
import {Button} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_SCREEN, RootStackParamList} from '@navigation/ScreenTypes';
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ['Video', 'Image'];
  const openSetting = () => {
    navigation.navigate(APP_SCREEN.SETTING);
  };

  const selectGroup = useCallback(
    (data: VideoGroupEntity) => {
      navigation.navigate(APP_SCREEN.VIDEO_LIST, {
        data,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Header
        title="Video compressor"
        headerRight={
          <View style={styles.headerRight}>
            <Icon
              onPress={openSetting}
              name="settings"
              size={sizes._30sdp}
              color={colors.white}
            />
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
          renderItem={({item}) => (
            <VideoGroup onPress={() => selectGroup(item)} data={item} />
          )}
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
