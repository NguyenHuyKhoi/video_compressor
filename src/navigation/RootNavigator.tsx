import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {APP_SCREEN, RootStackParamList} from './ScreenTypes';
import {Home} from '@screens';
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={APP_SCREEN.HOME}
        component={Home}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
