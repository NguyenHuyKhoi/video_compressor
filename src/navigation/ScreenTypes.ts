import {ConfigEntity, VideoEntity, VideoGroupEntity} from '@model';

export enum APP_SCREEN {
  HOME = 'HOME',
  VIDEO_LIST = 'VIDEO_LIST',
  VIDEO_COMPRESS_SETTING = 'vIDEO_COMPRESS_SETTING',
  VIDEO_TASKS = 'VIDEO_TASKS',
  VIDEO_COMPRESS_PROCESS = 'VIDEO_COMPRESS_PROCESS',
  VIDEO_PLAY = 'VIDEO_PLAY',
  SETTING = 'SETTING',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.VIDEO_LIST]: {
    data: VideoGroupEntity;
  };
  [APP_SCREEN.VIDEO_COMPRESS_SETTING]: {
    data: VideoEntity;
  };
  [APP_SCREEN.VIDEO_TASKS]: {
    data: VideoEntity;
  };
  [APP_SCREEN.VIDEO_COMPRESS_PROCESS]: {
    data: VideoEntity;
    config: ConfigEntity;
  };
  [APP_SCREEN.VIDEO_PLAY]: {
    uri: string;
  };
  [APP_SCREEN.SETTING]: undefined;
};
