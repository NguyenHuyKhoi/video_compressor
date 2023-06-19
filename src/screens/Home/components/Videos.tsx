import {VideoEntity} from '@model';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Video} from './Video';

interface Props {
  data: VideoEntity[];
}
export const Videos: FC<Props> = ({data}) => {
  const list = data.length % 2 === 0 ? data : [...data, null];
  return (
    <FlatList
      data={list}
      keyExtractor={(item: VideoEntity, index: number) => index + ''}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={({item}) => (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '48%',
            marginHorizontal: sizes._7sdp,
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
