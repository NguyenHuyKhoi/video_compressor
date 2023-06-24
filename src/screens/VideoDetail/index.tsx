import {APP_SCREEN, RootStackParamList} from '@navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  Alert,
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
import {requestWriteStorage} from '@native/permission';
import {useSelector} from '@common';
import {ConfigEntity} from '@model';
interface Props {}

export const VideoDetail: FC<Props> = ({}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, APP_SCREEN.VIDEO_DETAIL>
    >();
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VIDEO_DETAIL>>();
  const [config, setConfig] = useState<ConfigEntity | undefined>(undefined);
  const {scrollEnable} = useSelector(x => x.view);
  const data = route.params.data;

  const compress = useCallback(async () => {
    if (!config) {
      return;
    }
    const granted = await requestWriteStorage();
    if (!granted) {
      Alert.alert('Please granted write permssion');
      return;
    }
    navigation.navigate(APP_SCREEN.VIDEO_COMPRESS, {
      data,
      config,
    });
  }, [config, data, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={scrollEnable}
        style={styles.body}
        showsVerticalScrollIndicator={false}>
        <Detail data={data} />
        <Configs data={data} onChange={setConfig} />
      </ScrollView>
      {config !== undefined && (
        <TouchableOpacity style={styles.btnView} onPress={compress}>
          <Text style={styles.btnLabel}>Compress</Text>
        </TouchableOpacity>
      )}
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
