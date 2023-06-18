import {VideoEntity, VideoGroupEntity} from '@model';

export enum APP_SCREEN {
  HOME = 'HOME',
  VIDEO_LIST = 'VIDEO_LIST',
  VIDEO_TASKS = 'VIDEO_TASKS',
  VIDEO_COMPRESS = 'VIDEO_COMPRESS',
  VIDEO_PLAY = 'VIDEO_PLAY',
  SETTING = 'SETTING',
  VIDEO_DETAIL = 'VIDEO_DETAIL',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.VIDEO_LIST]: {
    data: VideoGroupEntity;
  };
  [APP_SCREEN.VIDEO_COMPRESS]: {
    data: VideoEntity;
  };
  [APP_SCREEN.VIDEO_DETAIL]: {
    data: VideoEntity;
  };
  [APP_SCREEN.VIDEO_TASKS]: {
    data: VideoEntity;
  };
  [APP_SCREEN.VIDEO_PLAY]: {
    uri: string;
  };
  [APP_SCREEN.SETTING]: undefined;
};
