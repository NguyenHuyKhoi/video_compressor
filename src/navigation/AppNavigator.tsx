import {RXStore, useSelector} from '@common';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {navigationRef} from './NavigationServices';
import {RootNavigation} from './RootNavigator';
export const AppContainer = () => {
  //Check all setting app : language, appMode
  const {i18n} = useTranslation();
  const {language} = useSelector(x => x.language);
  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigation />
      <RXStore />
    </NavigationContainer>
  );
};
