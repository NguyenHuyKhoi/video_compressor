import {RXStore} from '@common';
import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import {navigationRef} from './NavigationServices';
import {RootNavigation} from './RootNavigator';
export const AppContainer = () => {
  //Check all setting app : language, appMode
  const {i18n} = useTranslation();
  const detectLang = useCallback(() => {
    console.log('Detect lang');
    const supportedLanguages = ['en', 'vi'];
    const defaultLang = 'en';
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager?.settings?.AppleLocale ||
          NativeModules.SettingsManager?.settings?.AppleLanguages[0] ||
          ''
        : NativeModules.I18nManager?.localeIdentifier || '';

    const [lowerCaseLocale] = locale.split('_');

    if (supportedLanguages.includes(lowerCaseLocale)) {
      i18n.changeLanguage(lowerCaseLocale);
    } else {
      i18n.changeLanguage(defaultLang);
    }
  }, [i18n]);
  useEffect(() => {
    detectLang();
  }, [detectLang]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigation />
      <RXStore />
    </NavigationContainer>
  );
};
