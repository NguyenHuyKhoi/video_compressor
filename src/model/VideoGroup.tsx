import {VideoEntity} from './Video';

export interface VideoGroupEntity {
  name: string;
  app_folder?: boolean;
  videos: VideoEntity[];
}
