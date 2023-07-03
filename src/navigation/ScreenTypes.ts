import {ConfigEntity, VideoEntity} from '@model';

export enum APP_SCREEN {
  HOME = 'HOME',
  VIDEO_COMPRESS = 'VIDEO_COMPRESS',
  VIDEO_PLAY = 'VIDEO_PLAY',
  VIDEO_DETAIL = 'VIDEO_DETAIL',
  LIBRARY = 'LIBRARY',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.LIBRARY]: undefined;
  [APP_SCREEN.VIDEO_COMPRESS]: {
    data: VideoEntity;
    config: ConfigEntity;
    folder_uri: string;
  };
  [APP_SCREEN.VIDEO_DETAIL]: {
    data: VideoEntity;
  };
  [APP_SCREEN.VIDEO_PLAY]: {
    uri: string;
  };
};
