import {useNavigation} from '@react-navigation/native';
import {colors} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {}
export const BackButton: FC<Props> = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="arrow-back" size={sizes._25sdp} color={colors.white} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: sizes._8sdp,
  },
});
