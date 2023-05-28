/* eslint-disable react-native/no-inline-styles */
import {colors} from '@themes';
import {_screen_width, sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  tabs: string[];
  onSelectTab: (value: number) => void;
  selectedTab: number;
}
export const Tabs: FC<Props> = ({tabs, onSelectTab, selectedTab}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab: string, index: number) => (
        <TouchableOpacity
          key={index + ''}
          onPress={() => onSelectTab(index)}
          style={[
            styles.itemContainer,
            {
              borderBottomColor:
                selectedTab === index ? colors.secondary : colors.primary,
              borderBottomWidth: sizes._5sdp,
            },
          ]}>
          <Text style={styles.itemLabel}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: _screen_width,
    flexDirection: 'row',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes._16sdp,
    backgroundColor: colors.primary,
  },
  itemLabel: {
    fontSize: sizes._16sdp,
    fontWeight: '600',
    color: colors.white,
  },
});
