import {VideoEntity} from '@model';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Video} from './Video';
import {useSelector} from '@common';

interface Props {
  data: VideoEntity[];
}
export const Videos: FC<Props> = ({data}) => {
  const {deleted_uris} = useSelector(x => x.video);
  const displayData = data.filter(
    item => !deleted_uris.find(uri => item.uri === uri),
  );
  return (
    <FlatList
      data={displayData}
      keyExtractor={(item: VideoEntity, index: number) => index + ''}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginBottom: sizes._15sdp,
          }}>
          {item && <Video data={item} />}
        </View>
      )}
      ListFooterComponent={() => <View style={{height: sizes._20sdp}} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {flex: 1},
});
