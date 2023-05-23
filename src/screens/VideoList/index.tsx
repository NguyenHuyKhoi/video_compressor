import {BackButton, Header} from '@components';
import {VideoGroupEntity} from '@src/model';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import videoGroups from '../../redux/data.json';
import {Video} from './components';
interface HomeProps {}

export const VideoList: FC<HomeProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Header
        title="Video compressor"
        headerLeft={<BackButton />}
        headerRight={
          <View style={styles.headerRight}>
            <Icon name="sort" size={sizes._30sdp} color={colors.white} />
          </View>
        }
      />
      <FlatList
        data={videoGroups[0].items}
        numColumns={3}
        keyExtractor={(item: VideoGroupEntity, index: number) => index + ''}
        renderItem={({item}) => <Video data={item} />}
      />
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
