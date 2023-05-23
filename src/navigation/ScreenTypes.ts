export enum APP_SCREEN {
  HOME = 'HOME',
  VIDEO_LIST = 'VIDEO_LIST',
  VIDEO_COMPRESS_SETTING = 'vIDEO_COMPRESS_SETTING',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.VIDEO_LIST]: undefined;
  [APP_SCREEN.VIDEO_COMPRESS_SETTING]: undefined;
};
