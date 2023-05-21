import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface HomeProps {}
export const Home: FC<HomeProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
