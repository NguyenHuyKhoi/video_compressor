import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {APP_SCREEN, RootStackParamList} from './ScreenTypes';
import {Home, VideoCompressSetting, VideoList, VideoTasks} from '@screens';
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName={APP_SCREEN.VIDEO_TASKS}>
      <RootStack.Screen
        name={APP_SCREEN.HOME}
        component={Home}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <RootStack.Screen
        name={APP_SCREEN.VIDEO_LIST}
        component={VideoList}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <RootStack.Screen
        name={APP_SCREEN.VIDEO_TASKS}
        component={VideoTasks}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <RootStack.Screen
        name={APP_SCREEN.VIDEO_COMPRESS_SETTING}
        component={VideoCompressSetting}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
