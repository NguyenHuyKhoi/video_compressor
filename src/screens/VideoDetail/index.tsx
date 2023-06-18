import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Configs, Detail} from './component';
import {sizes} from '@utils';
import {colors} from '@themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
interface Props {}

export const VideoDetail: FC<Props> = ({}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.VIDEO_DETAIL>
    >();
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_DETAIL>>();
  const data = route.params.data;

  const compress = useCallback(() => {
    navigation.navigate(APP_SCREEN.VIDEO_COMPRESS, {
      data,
    });
  }, [data, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Detail data={data} />
        <Configs data={data} />
      </ScrollView>
      <TouchableOpacity style={styles.btnView} onPress={compress}>
        <Text style={styles.btnLabel}>Compress</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191a1e',
  },
  body: {
    flex: 1,
  },
  btnView: {
    paddingVertical: sizes._15sdp,
    backgroundColor: '#4a9ae4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    fontSize: sizes._20sdp,
    fontWeight: '500',
    color: colors.white,
  },
});
