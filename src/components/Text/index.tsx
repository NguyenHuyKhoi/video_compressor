import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text as RNText, StyleProp, TextStyle} from 'react-native';
interface Props {
  children: string;
  params?: any;
  style?: StyleProp<TextStyle>;
}
export const Text: FC<Props> = ({children, params, style, ...props}) => {
  const {t, i18n} = useTranslation();
  return (
    <RNText {...props} style={style}>
      {/* {i18n.exists(children) ? t(children) : children} */}
      {params ? t(children, params) : t(children)}
    </RNText>
  );
};
