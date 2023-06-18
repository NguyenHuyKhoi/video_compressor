import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Setting,
  VideoCompress,
  VideoDetail,
  VideoList,
  VideoPlay,
  VideoTasks,
} from '@screens';
import React from 'react';
import {APP_SCREEN, RootStackParamList} from './ScreenTypes';
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName={APP_SCREEN.HOME}>
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
        name={APP_SCREEN.VIDEO_COMPRESS}
        component={VideoCompress}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <RootStack.Screen
        name={APP_SCREEN.VIDEO_PLAY}
        component={VideoPlay}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <RootStack.Screen
        name={APP_SCREEN.VIDEO_DETAIL}
        component={VideoDetail}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <RootStack.Screen
        name={APP_SCREEN.SETTING}
        component={Setting}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
