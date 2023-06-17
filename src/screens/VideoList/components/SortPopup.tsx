import {sizes} from '@utils';
import {colors} from '@themes';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {VideoEntity} from '@model';
import Icon from 'react-native-vector-icons/MaterialIcons';
export interface SortType {
  id: number;
  label: string;
  sortFunc: (a: VideoEntity, b: VideoEntity) => number;
}
export const SortTypes: SortType[] = [
  {
    id: 0,
    label: 'Thời gian tạo (tăng)',
    sortFunc: (a: VideoEntity, b: VideoEntity) =>
      a.createdAt < b.createdAt ? -1 : 1,
  },
  {
    id: 1,
    label: 'Thời gian tạo (giảm)',
    sortFunc: (a: VideoEntity, b: VideoEntity) =>
      a.createdAt > b.createdAt ? -1 : 1,
  },
  {
    id: 2,
    label: 'Kích thước (tăng)',
    sortFunc: (a: VideoEntity, b: VideoEntity) => (a.size > b.size ? -1 : 1),
  },
  {
    id: 3,
    label: 'Kích thước (giảm)',
    sortFunc: (a: VideoEntity, b: VideoEntity) => (a.size < b.size ? -1 : 1),
  },
];
interface MenuItemProps {
  data: SortType;
  onPress: () => void;
  selected: boolean;
}
const MenuItem: FC<MenuItemProps> = ({data, selected, onPress}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLabelView}>
        <Icon
          name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
          color={colors.white}
          size={sizes._20sdp}
        />
        <Text style={styles.menuItemLabel}>{data.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface Props {
  style?: any;
  current: SortType;
  onSelect: (a: SortType) => void;
}
export const SortPopup: FC<Props> = ({style, current, onSelect}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.body}>
        {SortTypes.map((item: SortType) => (
          <MenuItem
            data={item}
            selected={current.id === item.id}
            onPress={() => onSelect(item)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'column',
  },
  sticky: {
    alignSelf: 'flex-end',
    marginRight: sizes._16sdp,
  },
  body: {
    flexDirection: 'column',
    width: sizes._213sdp,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: sizes._8sdp,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: sizes._5sdp,
  },
  menuItemLabelView: {
    paddingVertical: sizes._10sdp,
    borderBottomWidth: sizes._1sdp,
    borderBottomColor: colors.black,
    width: '100%',
    marginLeft: sizes._10sdp,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    color: colors.white,
    fontWeight: '400',
    fontSize: sizes._15sdp,
    marginLeft: sizes._15sdp,
  },
});
